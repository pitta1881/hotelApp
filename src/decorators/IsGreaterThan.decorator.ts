import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDateGreaterThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDateGreaterThan',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(dateToIn: Date, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const dateTo = new Date(dateToIn).getTime();
          const dateFrom = new Date(
            (args.object as Date)[relatedPropertyName],
          ).getTime();
          return dateTo > dateFrom;
        },
      },
    });
  };
}
