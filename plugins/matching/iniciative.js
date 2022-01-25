const matchesFilter = (iniciative, { primary, secondary, terciary }) => {
    let primaryMatch = true;
    let secondaryMatch = true;
    let terciaryMatch = true;
  
    if (primary.length > 0) {
      primaryMatch = iniciative.area.major.some((major) => primary.includes(major));
    }
  
    if (secondary.length > 0) {
      secondaryMatch = iniciative.area.minor.some((minor) =>
        secondary.includes(minor)
      );
    }
  
    const [campus, unity, bond] = terciary;
  
    if (campus) {
      terciaryMatch = iniciative.campus === campus;
    }
  
    if (unity) {
      terciaryMatch = terciaryMatch && iniciative.unities.includes(unity);
    }
  
    if (bond) {
      terciaryMatch = terciaryMatch && iniciative.bond === bond;
    }
  
    return primaryMatch && secondaryMatch && terciaryMatch;
  };
  
  export default (_, inject) => {
    inject("skillMatchesFilter", matchesFilter);
  };