type VersionedData = {
  meta: { version: number };
  data: Record<string, unknown>;
};

export const version = 154;

export async function migrate(
  originalVersionedData: VersionedData,
): Promise<VersionedData> {
  const { meta, data } = originalVersionedData;
  return {
    meta: { ...meta, version },
    data: Object.fromEntries(Object.entries(data).filter(([key]) => key !== 'QueuedRequestController')),
  };
}
