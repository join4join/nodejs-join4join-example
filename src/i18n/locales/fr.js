module.exports = {
    common: {
        error: "Une erreur est survenue. Réessaie dans un instant.",
        noPermission: "Tu n'as pas la permission d'utiliser cette commande.",
        guildOnly: "Cette commande ne peut être utilisée que dans un serveur.",
        on: "✅ Oui",
        off: "❌ Non",
    },

    commands: {
        help: "Affiche la liste des commandes disponibles.",
        invite: "Obtiens les liens utiles de Join4Join.",
        balance: "Consulte ton solde de coins et tes dernières transactions.",
        daily: "Récupère tes coins quotidiens toutes les 24h.",
        farm: "Obtiens des serveurs à rejoindre pour gagner des coins.",
        info: "Affiche les infos Join4Join de ce serveur.",
        check: "Vérifie si tu peux quitter ce serveur sans perdre de coins.",
        buy: "Dépense tes coins pour faire la pub de ton serveur.",
        pay: "Envoie des coins à un ami.",
        stats: "Consulte tes gains de développeur et tes stats d'affiliation.",
    },

    help: {
        title: "Aide",
        intro: "Voici toutes les commandes disponibles :",
        links: "[Site web]({url}) • [Support]({support}) • [Ajouter le bot]({invite})",
    },

    invite: {
        title: "Liens utiles",
        description:
            "> [Ajouter le bot]({invite})\n" +
            "> [Site Join4Join]({url})\n" +
            "> [Serveur de support]({support})",
    },

    balance: {
        title: "Solde",
        coins: "Tu as **{coins}** coins.\n> Gagnes-en plus sur [join4join.xyz]({url})",
        transactionsTitle: "Transactions récentes",
        noTransactions: "Aucune transaction récente.",
    },

    daily: {
        title: "Récompense quotidienne",
        claimed: "**Tu as récupéré tes {amount} coins quotidiens !**\n> Reviens dans 24h pour en gagner plus.",
        wait: "**Tu as déjà récupéré ta récompense quotidienne.**\n> Reviens dans **{hours}h {minutes}m {seconds}s**.",
    },

    farm: {
        title: "Farm",
        intro:
            "**Rejoins les serveurs ci-dessous pour gagner des coins.**\n" +
            "Dépense-les sur [join4join.xyz]({url}) pour faire grandir ton serveur.\n" +
            "⚠️ Quitter un serveur avant **4 jours** te retire **2 coins**.\n" +
            "Quand tu as terminé, clique sur **Réclamer mes coins**.",
        progress: "Progression : {done}/{total}",
        none: "**Aucun serveur à farm pour le moment.** 🎉\n> Tu as tout rejoint, reviens plus tard !",
        claimButton: "Réclamer mes coins",
        refreshButton: "Actualiser",
    },

    info: {
        title: "Infos du serveur",
        adRunning:
            "**Une pub est en cours sur ce serveur.**\n" +
            "> Progression : **{done}/{total}** membres\n" +
            "> Filtre multicomptes : **{alts}**\n" +
            "> Filtre langue : **{lang}**",
        noAd:
            "**Aucune pub n'est en cours sur ce serveur.**\n" +
            "> Lances-en une sur [join4join.xyz]({url}) ou avec la commande `/buy`.",
    },

    check: {
        title: "Vérification",
        canLeave: "✅ **Tu peux quitter ce serveur sans perdre de coins.**",
        mustWait: "⏳ **Attends 4 jours avant de quitter ce serveur**, sinon tu perdras des coins.",
    },

    buy: {
        optInvite: "Le lien d'invitation du serveur à mettre en avant",
        optMembers: "Combien de membres acheter (minimum 3)",
        optLanguage: "N'affiche ta pub qu'aux utilisateurs de cette langue",
        optFilter: "Filtrer les multicomptes (coûte un peu plus)",
        langAll: "🌍 Toutes les langues",
        langEn: "🇬🇧 Anglais",
        langFr: "🇫🇷 Français",
        langTr: "🇹🇷 Turc",
        invalidInvite: "Merci de fournir une invitation Discord valide (ex : https://discord.gg/xxxxxxx).",
        invalidCoins: "Le nombre de membres doit être un entier.",
        minCoins: "Tu dois acheter au moins **3** membres.",
        notEnough: "Tu n'as pas assez de coins. Ton solde : **{coins}**.",
        successTitle: "Pub prête",
        success: "✅ Ta pub est prête !\n> Clique **[ici]({link})** pour la lancer.",
        liveTitle: "Pub lancée",
        live: "✅ Ta pub est maintenant en ligne !\n> Gère-la **[ici]({link})**.",
    },

    pay: {
        optUser: "L'ami à qui tu veux envoyer des coins",
        optAmount: "Combien de coins envoyer",
        cannotSelf: "Tu ne peux pas t'envoyer des coins à toi-même.",
        cannotBot: "Tu ne peux pas envoyer de coins à un bot.",
        invalidCoins: "Le nombre de coins doit être un entier supérieur à 0.",
        notEnough: "Tu n'as pas assez de coins. Ton solde : **{coins}**.",
        successTitle: "Transfert",
        sentDirect: "✅ Tu as envoyé **{coins}** coins à {user}.",
        confirm: "✅ Presque fini ! **[Confirme ton transfert ici]({link})** pour envoyer **{coins}** coins à {user}.\n> C'est toi (l'expéditeur) qui te connectes et confirmes. Les coins sont débités de **ton** solde.",
    },

    stats: {
        title: "Stats développeur",
        intro: "Voici les performances de ton bot.\nTu gagnes **0,10 coin** chaque fois qu'un de tes utilisateurs farm un serveur.",
        balance: "💰 Solde",
        affiliatedUsers: "👥 Utilisateurs affiliés",
        affiliatedUsers30d: "+{count} ce mois-ci",
        farms: "🌱 Farms de tes utilisateurs",
        earned: "🪙 Gains d'affiliation",
        apiRequests: "📡 Requêtes API",
        apiRequests30d: "{count} ce mois-ci",
        coins: "**{value}** coins",
    },
};
