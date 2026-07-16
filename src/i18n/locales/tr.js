module.exports = {
    common: {
        error: "Bir şeyler ters gitti. Lütfen birazdan tekrar dene.",
        noPermission: "Bu komutu kullanma iznin yok.",
        guildOnly: "Bu komut yalnızca bir sunucu içinde kullanılabilir.",
        on: "✅ Evet",
        off: "❌ Hayır",
    },

    commands: {
        help: "Mevcut komutların listesini göster.",
        invite: "Faydalı Join4Join bağlantılarını al.",
        balance: "Coin bakiyeni ve son işlemlerini gör.",
        daily: "Her 24 saatte bir günlük coinlerini al.",
        farm: "Coin kazanmak için katılınacak sunucuları al.",
        info: "Bu sunucunun Join4Join bilgilerini gör.",
        check: "Coin kaybetmeden bu sunucudan ayrılıp ayrılamayacağını kontrol et.",
        buy: "Sunucunun reklamını yapmak için coinlerini harca.",
        pay: "Bir arkadaşına coin gönder.",
        stats: "Geliştirici kazançlarını ve affiliation istatistiklerini gör.",
    },

    help: {
        title: "Yardım",
        intro: "İşte mevcut tüm komutlar:",
        links: "[Web sitesi]({url}) • [Destek]({support}) • [Botu ekle]({invite})",
    },

    invite: {
        title: "Faydalı bağlantılar",
        description:
            "> [Botu ekle]({invite})\n" +
            "> [Join4Join web sitesi]({url})\n" +
            "> [Destek sunucusu]({support})",
    },

    balance: {
        title: "Bakiye",
        coins: "**{coins}** coinin var.\n> Daha fazlasını [join4join.xyz]({url}) üzerinden kazan",
        transactionsTitle: "Son işlemler",
        noTransactions: "Son işlem yok.",
    },

    daily: {
        title: "Günlük ödül",
        claimed: "**{amount} günlük coinini aldın!**\n> Daha fazlası için 24 saat sonra tekrar gel.",
        wait: "**Günlük ödülünü zaten aldın.**\n> **{hours}s {minutes}d {seconds}sn** sonra tekrar gel.",
    },

    farm: {
        title: "Farm",
        intro:
            "**Coin kazanmak için aşağıdaki sunuculara katıl.**\n" +
            "Sunucunu büyütmek için onları [join4join.xyz]({url}) üzerinde harca.\n" +
            "⚠️ Bir sunucudan **4 gün** içinde ayrılmak bakiyenden **2 coin** düşer.\n" +
            "İşin bitince **Coinlerimi al** düğmesine tıkla.",
        progress: "İlerleme: {done}/{total}",
        none: "**Şu anda farm edilecek sunucu yok.** 🎉\n> Mevcut her şeye katıldın, daha sonra tekrar kontrol et!",
        claimButton: "Coinlerimi al",
        refreshButton: "Yenile",
    },

    info: {
        title: "Sunucu bilgisi",
        adRunning:
            "**Bu sunucuda şu anda bir reklam yayınlanıyor.**\n" +
            "> İlerleme: **{done}/{total}** üye\n" +
            "> Sahte hesap filtresi: **{alts}**\n" +
            "> Dil filtresi: **{lang}**",
        noAd:
            "**Bu sunucuda şu anda reklam yok.**\n" +
            "> [join4join.xyz]({url}) üzerinden veya `/buy` komutuyla bir tane başlat.",
    },

    check: {
        title: "Kontrol",
        canLeave: "✅ **Coin kaybetmeden bu sunucudan ayrılabilirsin.**",
        mustWait: "⏳ **Bu sunucudan ayrılmadan önce 4 gün bekle**, yoksa coin kaybedersin.",
    },

    buy: {
        optInvite: "Tanıtılacak sunucunun davet bağlantısı",
        optMembers: "Kaç üye satın alınacak (en az 3)",
        optLanguage: "Reklamını yalnızca bu dildeki kullanıcılara göster",
        optFilter: "Sahte hesapları filtrele (biraz daha pahalı)",
        langAll: "🌍 Tüm diller",
        langEn: "🇬🇧 İngilizce",
        langFr: "🇫🇷 Fransızca",
        langTr: "🇹🇷 Türkçe",
        invalidInvite: "Lütfen geçerli bir Discord davetiyesi gir (örn: https://discord.gg/xxxxxxx).",
        invalidCoins: "Üye sayısı tam bir sayı olmalı.",
        minCoins: "En az **3** üye satın almalısın.",
        notEnough: "Yeterli coinin yok. Bakiyen: **{coins}**.",
        successTitle: "Reklam hazır",
        success: "✅ Reklamın hazır!\n> Başlatmak için **[buraya]({link})** tıkla.",
        liveTitle: "Reklam başlatıldı",
        live: "✅ Reklamın artık yayında!\n> **[Buradan]({link})** yönet.",
    },

    pay: {
        optUser: "Coin göndermek istediğin arkadaş",
        optAmount: "Kaç coin gönderilecek",
        cannotSelf: "Kendine coin gönderemezsin.",
        cannotBot: "Bir bota coin gönderemezsin.",
        invalidCoins: "Coin miktarı 0'dan büyük tam bir sayı olmalı.",
        notEnough: "Yeterli coinin yok. Bakiyen: **{coins}**.",
        successTitle: "Transfer",
        sentDirect: "✅ {user} kullanıcısına **{coins}** coin gönderdin.",
        confirm: "✅ Neredeyse bitti! {user} kullanıcısına **{coins}** coin göndermek için **[transferini buradan onayla]({link})**.\n> Gönderen sensin. Giriş yapıp kendin onaylarsın, coinler **senin** bakiyenden düşülür.",
    },

    stats: {
        title: "Geliştirici istatistikleri",
        intro: "Botunun performansı burada.\nKullanıcılarından biri bir sunucu farm ettiğinde **0.10 coin** kazanırsın.",
        balance: "💰 Bakiye",
        affiliatedUsers: "👥 Affiliate kullanıcılar",
        affiliatedUsers30d: "bu ay +{count}",
        farms: "🌱 Kullanıcılarının farmları",
        earned: "🪙 Affiliation kazancı",
        apiRequests: "📡 API istekleri",
        apiRequests30d: "bu ay {count}",
        coins: "**{value}** coin",
    },
};
