const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

// Comando para poner el panel de tickets en un canal
client.on('messageCreate', async (message) => {
  if (message.content === '!setup-tickets') {
    const embed = new EmbedBuilder()
      .setTitle('📩 Centro de Soporte GRalguien')
      .setDescription('Haz clic en el botón de abajo para abrir un ticket de ayuda privada.')
      .setColor('#0099ff'); // El azul de tu avatar

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('abrir_ticket')
          .setLabel('Abrir Ticket')
          .setStyle(ButtonStyle.Primary),
      );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});

// Lógica para cuando alguien pulsa el botón
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'abrir_ticket') {
    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] }, // Oculto para todos
        { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] }, // Visible para el usuario
      ],
    });

    await interaction.reply({ content: `✅ Ticket creado en ${channel}`, ephemeral: true });
    await channel.send(`¡Hola ${interaction.user}! Bienvenido al soporte de **GRalguien**. Cuéntanos tu problema.`);
  }
});

client.login('MTQ3Njk3NDQ2MTU0MTU0ODA0Mw.GBIJnV.Uf6v5WAlPEEUtlGExjzgcmkM3rIItGK63jVZ0Q'); 
