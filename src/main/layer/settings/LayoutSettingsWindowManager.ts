export type LayerSettingsWindowManager = {
  show(id: string): void;
  getLayerIdfromElectronWindowId(electronId: number): string | null;
};
