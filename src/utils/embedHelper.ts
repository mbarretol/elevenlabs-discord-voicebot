import { ColorResolvable, EmbedBuilder } from 'discord.js';

type PresetType = 'success' | 'error' | 'info' | 'warning';

const presetColors: Record<PresetType, ColorResolvable> = {
  success: 'Green',
  error: 'Red',
  info: 'Blue',
  warning: 'Yellow',
};

function createEmbed(
  title: string,
  description?: string,
  type?: PresetType,
  color?: ColorResolvable
): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setColor(type ? presetColors[type] : color || 0x0099ff)
    .setTitle(title)
    .setTimestamp();

  if (description) {
    embed.setDescription(description);
  }

  return embed;
}

export const Embeds = {
  success: (title: string, description?: string) => createEmbed(title, description, 'success'),
  error: (title: string, description?: string) => createEmbed(title, description, 'error'),
  info: (title: string, description?: string) => createEmbed(title, description, 'info'),
  warning: (title: string, description?: string) => createEmbed(title, description, 'warning'),
};
