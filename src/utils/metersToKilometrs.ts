export const metersToKilometrs = (
    visibilityInMeters: number | undefined
): string => {
    if (!visibilityInMeters) return `- km`;
    const visibilityInKm = visibilityInMeters / 1000;
    return `${visibilityInKm.toFixed(0)}km`;
};
