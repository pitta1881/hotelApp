'use strict';

export const ifEquals = (arg1: any, arg2: any, options: any) => {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
};

export const greaterThan = (v1: any, v2: any, options: any) => {
  if (v1 > v2) {
    return options.fn(this);
  }
  return options.inverse(this);
};

export const jsonRaw = (context) => {
  return JSON.stringify(context);
};
