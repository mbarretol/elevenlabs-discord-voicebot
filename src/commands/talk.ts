import { AudioPlayer } from '@discordjs/voice';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { SpeechHandler } from '../api/discord/speech.js';
import { ElevenLabsConversationalAI } from '../api/elevenlabs/conversationalClient.js';
import { VoiceConnectionHandler } from '../api/index.js';
import { logger } from '../config/logger.js';
import { Embeds } from '../utils/index.js';

export const data = new SlashCommandBuilder()
  .setName('talk')
  .setDescription('Unleash an auditory adventure with a voice that echoes from the digital realm.');

/**
 * Represents the structure of the talk command using native SlashCommandBuilder.
 */
export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  try {
    const connectionHandler = new VoiceConnectionHandler(interaction);
    const connection = await connectionHandler.connect();
    if (!connection) {
      return;
    }
    const audioPlayer = new AudioPlayer();
    connection.subscribe(audioPlayer);

    const elevenlabsConvClient = new ElevenLabsConversationalAI(audioPlayer);

    const speechHandler = new SpeechHandler(elevenlabsConvClient, connection);
    speechHandler.initialize();
  } catch (error) {
    logger.error(error, 'Something went wrong during voice mode');

    await interaction.reply({
      embeds: [Embeds.error('Error', 'An error occurred while starting the voice chat.')],
      ephemeral: true,
    });
  }
}
