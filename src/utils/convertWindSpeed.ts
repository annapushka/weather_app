export const convertWindSpeed = (
    speedInMetersPerSecond: number | undefined
): string => {
    if (!speedInMetersPerSecond) return `- km/h`;
    return `${(speedInMetersPerSecond * 3.6).toFixed(0)}km/h`;
};
