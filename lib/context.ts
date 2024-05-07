// context.js
import React from "react";

export const CompletionContext = React.createContext({
  completion: "",
  setCompletion: (completion: string) => {},
});
