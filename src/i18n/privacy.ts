import type { Locale } from "./index";

const content = {
  "en": {
    "websiteInformation": "WEBSITE INFORMATION",
    "privacyYourInquiry": "Privacy & your inquiry",
    "lastUpdated27October2026": "Last updated: 27 October 2026",
    "websiteAndContact": "Website and contact",
    "thisWebsitePresentsBaliTravelIdeasUnderTheName": "This website presents Bali travel ideas under the name Yūgana Bari-kun. Tour inquiries are handled through WhatsApp at +62 813 3857 5123 or LINE ID silawati123.",
    "theInquiryForm": "The inquiry form",
    "theFormPreparesAWhatsappMessageInYourBrowser": "The form prepares a WhatsApp message in your browser. When you choose “Continue to WhatsApp”, the details you entered are passed to WhatsApp. You can review the message before sending it. This website has no booking database and does not save your form entries in browser storage.",
    "informationYouChooseToShare": "Information you choose to share",
    "shareOnlyWhatIsNeededToDiscussYourTrip": "Share only what is needed to discuss your trip, such as dates, number of guests, hotel area and preferences. Do not enter passport details, card numbers or sensitive medical information in this website’s form. To ask about information already sent in a conversation, contact us through the same WhatsApp number or LINE account you used.",
    "languageAppearance": "Language & appearance",
    "englishAndJapaneseUseSeparatePageAddressesEnglishIs": "English and Japanese use separate page addresses. English is the default homepage. Appearance follows your device setting until you choose light or dark mode; that choice is saved in your browser’s local storage when available. You can reset it by clearing this website’s browser data. No form entries are stored there.",
    "hostingAndExternalServices": "Hosting and external services",
    "thisWebsiteUsesCloudflareHostingAndDoesNotInclude": "This website uses Cloudflare hosting and does not include advertising or analytics scripts. Cloudflare may process connection information to deliver and secure the site. WhatsApp, LINE and linked official websites operate under their own privacy notices. LINE links open an external service; your form entries are not passed to LINE.",
    "tourInformationAndBooking": "Tour information and booking",
    "tourRoutesAndImagesAreIllustrativePublishedRouteIdeas": "Tour routes and images are illustrative. Published route ideas do not guarantee availability, prices, guide language, inclusions or a confirmed booking. Agree on the final details, payment and cancellation conditions before booking.",
    "backToTheWebsite": "← Back to the website"
  },
  "ja": {
    "websiteInformation": "サイト情報",
    "privacyYourInquiry": "プライバシーとお問い合わせ",
    "lastUpdated27October2026": "最終更新：2026年10月27日",
    "websiteAndContact": "サイトとお問い合わせ",
    "thisWebsitePresentsBaliTravelIdeasUnderTheName": "このサイトは、Yūgana Bari-kunの名称でバリ島の旅行プランをご紹介しています。ツアーのお問い合わせはWhatsApp（+62 813 3857 5123）またはLINE（ID：silawati123）で承っています。",
    "theInquiryForm": "お問い合わせフォーム",
    "theFormPreparesAWhatsappMessageInYourBrowser": "フォームはブラウザ上でWhatsApp用のメッセージを作成します。「WhatsAppで相談する」を選ぶと、入力した情報がWhatsAppに渡されます。送信前にメッセージをご確認いただけます。このサイトには予約データベースはなく、フォームの入力内容をブラウザのストレージに保存することもありません。",
    "informationYouChooseToShare": "お送りいただく情報",
    "shareOnlyWhatIsNeededToDiscussYourTrip": "旅行日、人数、ホテルエリア、ご希望など、旅のご相談に必要な情報をお送りください。このサイトのフォームには、旅券情報、カード番号、詳しい医療情報などを入力しないでください。すでにメッセージでお送りいただいた情報については、ご利用になったWhatsApp番号またはLINEアカウントへお問い合わせください。",
    "languageAppearance": "言語と表示テーマ",
    "englishAndJapaneseUseSeparatePageAddressesEnglishIs": "英語と日本語はそれぞれ別のURLで表示します。標準のホームページは英語です。表示テーマは端末の設定に従い、ライト・ダークモードを選択した場合は、利用可能なブラウザのローカルストレージに設定を保存します。このサイトの閲覧データを消去すると設定をリセットできます。フォームの入力内容は保存しません。",
    "hostingAndExternalServices": "ホスティングと外部サービス",
    "thisWebsiteUsesCloudflareHostingAndDoesNotInclude": "このサイトはCloudflareでホスティングされており、広告やアクセス解析のスクリプトは使用していません。Cloudflareは配信やセキュリティのために接続情報を処理する場合があります。WhatsApp、LINE、リンク先の公式サイトには、それぞれのプライバシー方針が適用されます。LINEのリンクは外部サービスを開きます。フォームの入力内容がLINEへ渡されることはありません。",
    "tourInformationAndBooking": "ツアー情報と予約",
    "tourRoutesAndImagesAreIllustrativePublishedRouteIdeas": "行程や画像はイメージです。掲載したモデルコースは、空き状況、料金、ガイドの対応言語、含まれる内容、予約確定を保証するものではありません。ご予約前に最終的な内容、お支払い、キャンセル条件をご確認ください。",
    "backToTheWebsite": "← ホームへ戻る"
  }
} as const;

export function getCopy(lang: Locale) { return content[lang]; }
