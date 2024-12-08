export const convertKelvinToCelsius = (
    tempInKelvin: number | undefined
): number | null => {
    if (!tempInKelvin) return null;
    const tempInCelsius = tempInKelvin - 273.15;
    return Math.floor(tempInCelsius);
};
