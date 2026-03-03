MTQ3Njk3NDQ2MTU0MTU0ODA0Mw.GV4PB4.FVokGz0_3ZDVCcT4wdf4h0asej-Ubb9aAlFTFA
const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// Panel de la Tienda de Posters
client.on('messageCreate', async (message) => {
  if (message.content === '!setup-tienda') {
    const embed = new EmbedBuilder()
      .setTitle('🖼️ Tienda de Posters GRalguien')
      .setDescription('¡Consigue tus posters favoritos con marco por solo 25€!\n\nHaz clic en el botón de abajo para abrir un pedido privado.')
      .setColor('#00FF00');

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('comprar_poster')
          .setLabel('🛒 Comprar Poster')
          .setStyle(ButtonStyle.Success),
      );

    await message.channel.send({ embeds: [embed], components: [row] });
  }
});

// Sistema de Pedidos Privados
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'comprar_poster') {
    const channel = await interaction.guild.channels.create({
      name: `pedido-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        { id: interaction.guild.id, deny: [PermissionFlagsBits.ViewChannel] },
        { id: interaction.user.id, allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages] },
      ],
    });

    await interaction.reply({ content: `✅ Pedido abierto en ${channel}`, ephemeral: true });
    await channel.send(`¡Hola ${interaction.user}! Cuéntanos qué poster quieres y te atenderemos enseguida.`);
  }
});

// ESTA LÍNEA ES LA CLAVE PARA QUE NO HAYA CORREOS DE ALERTA:
client.login(process.env.DISCORD_TOKEN);
