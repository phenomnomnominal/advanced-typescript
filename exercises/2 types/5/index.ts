type Configuration = {
  input: string;
  output: string;
};

function configure(config: Configuration): void {
  // ... handle config
}

configure({
  input: "./src",
  output: "./dist",
}); // ✅

// Missing property:
configure({
  input: "./src",
}); // ❌

// Extra property, maybe would expect this to work?
configure({
  input: "./src",
  output: "./dist",
  extra: false,
}); // ❌

// But it kind of makes sense that invalid properties don't
// work so that this error is more useful:
configure({
  input: "./src",
  outpu: "./dist",
}); // ❌

// Subtypes are all good too:
configure({
  input: "./src",
  output: "./dist",
} as const); // ✅
