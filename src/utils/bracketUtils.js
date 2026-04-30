import { BRACKET_2026, TEAM_DATA } from "../data/teamData.js";

export const STORAGE_KEY = "bracketlab_saved_brackets";

export const SEED_PAIRS = [
  [1, 16],
  [8, 9],
  [5, 12],
  [4, 13],
  [6, 11],
  [3, 14],
  [7, 10],
  [2, 15],
];

export const ROUND_OPTIONS = [
  { key: "r64", label: "Round of 64", shortLabel: "R64" },
  { key: "r32", label: "Round of 32", shortLabel: "R32" },
  { key: "s16", label: "Sweet 16", shortLabel: "S16" },
  { key: "e8", label: "Elite 8", shortLabel: "E8" },
  { key: "f4", label: "Final Four", shortLabel: "F4" },
  { key: "champ", label: "Championship", shortLabel: "Title" },
];

export const REGION_ROUNDS = ROUND_OPTIONS.slice(0, 4);
export const NATIONAL_ROUNDS = ROUND_OPTIONS.slice(4);

export function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function persistSaved(arr) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  } catch {
    // localStorage can fail in some browser privacy modes
  }
}

export function getPickKey(region, roundKey, gameIndex) {
  if (roundKey === "r64") {
    return `${region}-${gameIndex}`;
  }

  if (roundKey === "f4") {
    return `final-four-${gameIndex}`;
  }

  if (roundKey === "champ") {
    return "championship-0";
  }

  return `${region}-${roundKey}-${gameIndex}`;
}

function getOriginalSeed(teamName) {
  return TEAM_DATA[teamName]?.seed ?? "";
}

function makeTeamSlot(teamName) {
  if (!teamName) {
    return null;
  }

  return {
    name: teamName,
    seed: getOriginalSeed(teamName),
    record: TEAM_DATA[teamName]?.record ?? "",
  };
}

export function getRegionGames(region, roundKey, picks = {}) {
  const firstRound = BRACKET_2026[region] || [];

  if (roundKey === "r64") {
    return firstRound.map(([teamA, teamB], i) => {
      const [seedA, seedB] = SEED_PAIRS[i];

      return {
        key: getPickKey(region, "r64", i),
        region,
        roundKey,
        roundLabel: "Round of 64",
        label: `Game ${i + 1}`,
        teamA: {
          name: teamA,
          seed: seedA,
          record: TEAM_DATA[teamA]?.record ?? "",
        },
        teamB: {
          name: teamB,
          seed: seedB,
          record: TEAM_DATA[teamB]?.record ?? "",
        },
      };
    });
  }

  if (roundKey === "r32") {
    return [0, 1, 2, 3].map((i) => ({
      key: getPickKey(region, "r32", i),
      region,
      roundKey,
      roundLabel: "Round of 32",
      label: `Game ${i + 1}`,
      teamA: makeTeamSlot(picks[getPickKey(region, "r64", i * 2)]),
      teamB: makeTeamSlot(picks[getPickKey(region, "r64", i * 2 + 1)]),
    }));
  }

  if (roundKey === "s16") {
    return [0, 1].map((i) => ({
      key: getPickKey(region, "s16", i),
      region,
      roundKey,
      roundLabel: "Sweet 16",
      label: `Game ${i + 1}`,
      teamA: makeTeamSlot(picks[getPickKey(region, "r32", i * 2)]),
      teamB: makeTeamSlot(picks[getPickKey(region, "r32", i * 2 + 1)]),
    }));
  }

  if (roundKey === "e8") {
    return [
      {
        key: getPickKey(region, "e8", 0),
        region,
        roundKey,
        roundLabel: "Elite 8",
        label: "Region Final",
        teamA: makeTeamSlot(picks[getPickKey(region, "s16", 0)]),
        teamB: makeTeamSlot(picks[getPickKey(region, "s16", 1)]),
      },
    ];
  }

  return [];
}

export function getNationalGames(roundKey, picks = {}) {
  const regions = Object.keys(BRACKET_2026);

  const regionChamps = regions.map((region) =>
    makeTeamSlot(picks[getPickKey(region, "e8", 0)])
  );

  if (roundKey === "f4") {
    return [
      {
        key: getPickKey("National", "f4", 0),
        region: "National",
        roundKey,
        roundLabel: "Final Four",
        label: `${regions[0]} vs ${regions[1]}`,
        teamA: regionChamps[0],
        teamB: regionChamps[1],
      },
      {
        key: getPickKey("National", "f4", 1),
        region: "National",
        roundKey,
        roundLabel: "Final Four",
        label: `${regions[2]} vs ${regions[3]}`,
        teamA: regionChamps[2],
        teamB: regionChamps[3],
      },
    ];
  }

  if (roundKey === "champ") {
    return [
      {
        key: getPickKey("National", "champ", 0),
        region: "National",
        roundKey,
        roundLabel: "Championship",
        label: "Title Game",
        teamA: makeTeamSlot(picks[getPickKey("National", "f4", 0)]),
        teamB: makeTeamSlot(picks[getPickKey("National", "f4", 1)]),
      },
    ];
  }

  return [];
}

export function getAllGames(picks = {}) {
  const regionGames = Object.keys(BRACKET_2026).flatMap((region) =>
    REGION_ROUNDS.flatMap((round) => getRegionGames(region, round.key, picks))
  );

  const nationalGames = NATIONAL_ROUNDS.flatMap((round) =>
    getNationalGames(round.key, picks)
  );

  return [...regionGames, ...nationalGames];
}

export function getTotalGameCount() {
  return getAllGames({}).length;
}

export function countValidPicks(picks = {}) {
  return getAllGames(picks).filter(
    (game) => game.teamA && game.teamB && picks[game.key]
  ).length;
}

export function getChampion(picks = {}) {
  return picks[getPickKey("National", "champ", 0)] || null;
}

export function getRoundLabel(roundKey) {
  return ROUND_OPTIONS.find((round) => round.key === roundKey)?.label || roundKey;
}

export function prunePicksAfterChange(prevPicks, changedRegion, changedRoundKey) {
  const next = { ...prevPicks };

  const removeRegionRound = (region, roundKey) => {
    getRegionGames(region, roundKey, prevPicks).forEach((game) => {
      delete next[game.key];
    });
  };

  const removeNationalRound = (roundKey) => {
    getNationalGames(roundKey, prevPicks).forEach((game) => {
      delete next[game.key];
    });
  };

  if (changedRoundKey === "r64") {
    ["r32", "s16", "e8"].forEach((roundKey) =>
      removeRegionRound(changedRegion, roundKey)
    );
    ["f4", "champ"].forEach(removeNationalRound);
  } else if (changedRoundKey === "r32") {
    ["s16", "e8"].forEach((roundKey) =>
      removeRegionRound(changedRegion, roundKey)
    );
    ["f4", "champ"].forEach(removeNationalRound);
  } else if (changedRoundKey === "s16") {
    removeRegionRound(changedRegion, "e8");
    ["f4", "champ"].forEach(removeNationalRound);
  } else if (changedRoundKey === "e8") {
    ["f4", "champ"].forEach(removeNationalRound);
  } else if (changedRoundKey === "f4") {
    removeNationalRound("champ");
  }

  return next;
}