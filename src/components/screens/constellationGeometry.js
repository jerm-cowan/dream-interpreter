// Single source of truth for the Constellation triangle's geometry (all values are % of the
// square container), shared between the static guide lines/cards in ConstellationScreen and the
// animated reveal lines in ConnectingLines, so widening the cards never lets the two drift apart.
//
// Cards are flush with the container's outer edges and sized at CARD_SIZE_PCT square, so the top
// card's bottom-mid and the bottom cards' near corners land at these coordinates. CENTER_Y is
// solved so the brain sits equidistant from all three (see the algebra this was derived from:
// (CENTER_Y - CARD_SIZE_PCT)^2 = (50 - CARD_SIZE_PCT)^2 + (100 - CARD_SIZE_PCT - CENTER_Y)^2).
export const CARD_SIZE_PCT = 36
export const CENTER_X = 50
export const CENTER_Y = 53.5

export const LINE_ENDPOINTS = {
  psychology: { x1: CENTER_X, y1: CENTER_Y, x2: 50, y2: CARD_SIZE_PCT },
  // Overshoot 15% past the bottom cards' near corner so the extra length hides under the card
  // (rendered on top) and only a flush join at its rounded edge is visible.
  neuroscience: { x1: CENTER_X, y1: CENTER_Y, x2: 33.9, y2: 65.58 },
  symbolism: { x1: CENTER_X, y1: CENTER_Y, x2: 66.1, y2: 65.58 },
}
