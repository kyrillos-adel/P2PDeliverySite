import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class DeliveryRequestValidators{
  static priceRangeValidator(minPrice: string, maxPrice: string): ValidatorFn {
    return (group: AbstractControl) : ValidationErrors | null => {
      const minPriceValue = group.get(minPrice)?.value;
      const maxPriceValue = group.get(maxPrice)?.value;

      if (minPriceValue !== null && maxPriceValue !== null && minPriceValue > maxPriceValue) {
        return { priceRange: true };
      }
      return null;
    }
  }
}
