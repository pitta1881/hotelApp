'use strict';

//{{#ifEquals sampleString "This is a string"}} //true
//{{#ifEquals 3 3}} //true
//{{#ifEquals 3 "3"}} //false
export const ifEquals = (arg1: any, arg2: any, options: any) => {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
};

//{{#greaterThan 2 3}} //true
//{{#greaterThan 3 2}} //false
export const greaterThan = (v1: any, v2: any, options: any) => {
  if (v1 > v2) {
    return options.fn(this);
  }
  return options.inverse(this);
};

//{{#jsonRaw miJson}}
export const jsonRaw = (context) => {
  return JSON.stringify(context);
};
