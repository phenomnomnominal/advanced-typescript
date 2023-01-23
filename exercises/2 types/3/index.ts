const RATINGS = [1, 2, 3, 4, 5] as const;
const ratingsTuple = typeof RATINGS;
type Ratings = typeof RATINGS[6];

type SpecificEnd = [...Array<unknown>, string];
type SpecificStart = [number, ...Array<unknown>];
type SpecificBoth = [number, ...Array<unknown>, boolean];

// Classic example of a tuple is `useState` from React:
function useState<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>];
