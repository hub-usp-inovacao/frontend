export default function matchesFilter({ primary, secondary, terciary }) {
  let primaryMatch = true;
  let secondaryMatch = true;
  let terciaryMatch = true;

  if (primary.length > 0) {
    primaryMatch = primary == this.classification.major;
  }

  if (secondary.length > 0) {
    secondaryMatch = secondary == this.classification.minor;
  }

  const city = terciary[0];
  const incubator = terciary[1];
  const size = terciary[2];

  if (city) {
    terciaryMatch = this.city.includes(city);
  }

  if (incubator) {
    terciaryMatch = terciaryMatch && this.ecosystems.includes(incubator);
  }

  if (size) {
    terciaryMatch = terciaryMatch && this.companySize === size;
  }

  return primaryMatch && secondaryMatch && terciaryMatch;
}
