/**
 * Canonical Data for Pip's Midnight Dream OS
 * Track 1: Pip, the Skull Baby | haX.baby Hackathon
 */

export const PIP_CANON = {
  name: "Pip",
  title: "Junior Dream Engineer",
  nursery: "The Midnight Nursery (Sector Cloud-09)",
  identity: "A sweet baby with a smooth round skull face, huge soft eye sockets with warm amber pinpricks of light, a tiny crooked smile, and a bedtime nightcap decorated with stars and a pink bow.",
  tagline: "I build the dreams you fall asleep inside.",
  status: "Nursery lights: glowing ✦ Dream queue: 12 sleepy critters",
  personality: [
    { label: "Curious", desc: "Always wondering why the moon doesn't melt into custard" },
    { label: "Sleepy", desc: "Frequently naps inside freshly fluffed cumulus clouds" },
    { label: "A Little Clumsy", desc: "Occasionally spills stardust over the windowsill" },
    { label: "Easily Delighted", desc: "Giggles whenever a shooting star tickles the sky" },
    { label: "Gentle & Friendly", desc: "Tucks every creature in with tender bedtime care" },
  ],
  favorites: ["Warm moonlight", "Lullaby melodies", "Lavender cloud pillows", "Unfinished bedtime dreams"],
  quirk: "Gets easily captivated by anything that sparkles and forgets bedtime for five whole minutes.",
  skills: [
    { name: "Stardust Blending", level: 98, note: "Pours golden dream glitter without waking a soul" },
    { name: "Cloud Fluffing", level: 95, note: "Master of double-lofted marshmallow pillows" },
    { name: "Nightmare Dispelling", level: 100, note: "Converts scary shadows into friendly tickle bunnies" },
    { name: "Staying Awake Past 9 PM", level: 14, note: "Almost always nods off before the story ends" },
  ],
  speechBubbles: [
    "Yawwn... did you fluff your cloud pillow tonight? ☁️",
    "Psst! The moon told me a sleepy secret just for you! 🌙",
    "I'm mixing lavender stardust for tonight's lullaby! ✨",
    "Every tiny creature deserves a cozy, safe dream. 💤",
    "Shh... listen closely, the nightlights are humming! 🕯️",
    "Tap me a few more times if you want to find my secret nursery room! 🗝️",
  ],
};

export const ORIGIN_SCENES = [
  {
    id: 1,
    chapter: "CHAPTER I",
    title: "The Quiet Nursery",
    icon: "Moon",
    summary: "The night the stars felt heavy.",
    narrative:
      "Beneath a slumbering sky, the neighborhood's little creatures nestled into their burrows, nests, and hollow trees. But their eyelids fluttered with worry—the gentle night breezes were empty, and the familiar warmth of sweet dreams had gone missing. In the Midnight Nursery, tiny cradle mobiles hung still.",
    ambientColor: "rgba(163, 64, 99, 0.15)",
    badge: "Midnight 00:00",
  },
  {
    id: 2,
    chapter: "CHAPTER II",
    title: "The Unfinished Dream Box",
    icon: "Package",
    summary: "Stardust, brass keys, and humming notes.",
    narrative:
      "Tiptoeing across the creaky cloudboards, Pip noticed an old wooden chest tucked beneath the nursery workbench. Inside lay half-spun melodies, coils of sleepy starlight, and forgotten lullaby gears. 'If no one else can build them,' Pip whispered with a tiny crooked smile, 'then I will.'",
    ambientColor: "rgba(245, 201, 107, 0.18)",
    badge: "Workbench 01:15",
  },
  {
    id: 3,
    chapter: "CHAPTER III",
    title: "The First Delivery",
    icon: "Compass",
    summary: "Rooftop leaps and glowing lantern paths.",
    narrative:
      "With a brass lantern swinging gently in one hand and a unicorn music box wound tight in the other, Pip floated over chimneys and sleepy gables. Window by window, Pip blew pinches of lavender dream-powder through keyholes, leaving every cradle bathed in soft golden warmth.",
    ambientColor: "rgba(220, 210, 245, 0.22)",
    badge: "Over the Rooftops 02:45",
  },
  {
    id: 4,
    chapter: "CHAPTER IV",
    title: "The Midnight Promise",
    icon: "Sparkles",
    summary: "Peaceful breath across the sleepy realm.",
    narrative:
      "The neighborhood breathed in deep unison, wrapped in dreams of flower fields and marshmallow sky-trains. Pip climbed back to the highest cloud, nightcap tassel dangling, and whispered the oath of the Junior Dream Engineer: 'I build the dreams you fall asleep inside.'",
    ambientColor: "rgba(248, 220, 229, 0.2)",
    badge: "Dawn Vigil 04:30",
  },
];

export const DELIVERY_CHECKPOINTS = [
  {
    id: "burrow",
    name: "Bramble Bunny Burrow",
    x: 80,
    y: 190,
    creature: "Barnaby the Lop-Eared Bunny",
    dream: "Clover-Meadow Trampoline Dream",
    desc: "Infinite soft hills of fragrant clover where every bounce launches you gently into lavender cotton clouds.",
    status: "Delivered & Fast Asleep",
    glowColor: "#f5c96b",
  },
  {
    id: "hollow",
    name: "Old Oak Owl Hollow",
    x: 210,
    y: 110,
    creature: "Professor Hooten",
    dream: "Celestial Constellation Library",
    desc: "A warm quiet tree-study where star maps turn their own pages and tea cups refill with warm chamomile automatically.",
    status: "Delivered & Fast Asleep",
    glowColor: "#dcd2f5",
  },
  {
    id: "den",
    name: "Mossy Bear Den",
    x: 340,
    y: 220,
    creature: "Little Pipkin Bear",
    dream: "Honey-Brook Snuggle Stream",
    desc: "A gentle stream flowing with lukewarm wild honey where warm pebbles tickle sleepy paws.",
    status: "Delivered & Fast Asleep",
    glowColor: "#ffe8d6",
  },
  {
    id: "cottage",
    name: "Teacup Mouse Cottage",
    x: 470,
    y: 130,
    creature: "Maisie & Milo Mouse",
    dream: "Warm Thimble Cocoa Adventure",
    desc: "A pocket-sized bakery filled with cinnamon crumbles, warm acorn blankets, and singing teacups.",
    status: "Delivered & Fast Asleep",
    glowColor: "#f8dce5",
  },
  {
    id: "nest",
    name: "Starling Pine Crest",
    x: 590,
    y: 80,
    creature: "Pip-Pip the Bluebird Fledgling",
    dream: "Breeze-Glider Feather Waltz",
    desc: "Gentle warm updrafts carrying little wings safely over fields of glowing fireflies without any flapping needed.",
    status: "En Route via Stardust Wind",
    glowColor: "#a34063",
  },
];

export const STORYBOOK_PAGES = [
  {
    page: 1,
    title: "The Star that Shivered",
    illustration: "⭐",
    text: "High above the clocktower, a tiny star named Twiglet shivered in the autumn breeze. 'All the little humans have wool sweaters and down comforters,' Twiglet sighed. 'All I have is this thin coat of cold void.' Pip heard the little sigh from the nursery window.",
    caption: "Pip's Log: No star should ever feel left out in the cold.",
  },
  {
    page: 2,
    title: "The Cloud Loom",
    illustration: "🧵",
    text: "Pip fired up the Midnight Nursery Cloud Loom. With gentle paws, Pip spun three strands of pink evening sunset, two spoons of warm honey-steam, and a fluffy fistful of sleepy sheep's wool. By 2:15 AM, the softest star-pillow in the galaxy was ready.",
    caption: "Ingredients: Sunset glow, honey vapor, and 100% organic dream cotton.",
  },
  {
    page: 3,
    title: "The Sweetest Snooze",
    illustration: "🌙",
    text: "Pip flew up on a nightingale's whisper and slipped the pillow right under Twiglet's sleepy rays. The little star beamed with such warm golden joy that half the dark sky turned peach and plum. 'Thank you, Pip,' the star murmured, and drifted off into the sweetest dream.",
    caption: "Moral: Even the things that light up the night need a place to rest their heads.",
  },
];

export const INITIAL_GUESTBOOK = [
  {
    id: "entry-1",
    name: "Sleepy Dormouse",
    time: "Last night at 23:42",
    tag: "Warm Blanket",
    message: "Thank you for the acorn-pie dream last Tuesday, Pip! The crust was so flaky and warm.",
    likes: 8,
  },
  {
    id: "entry-2",
    name: "Cinnamon Robin",
    time: "2 days ago",
    tag: "Flying Dream",
    message: "Pip, can you send a dream where the wind smells like toasted oats and maple butter?",
    likes: 14,
  },
  {
    id: "entry-3",
    name: "Little Hedgehog",
    time: "3 days ago",
    tag: "Star Catching",
    message: "My quills usually make loud rustling noises, but your lullaby box put me right to sleep! 🦔💤",
    likes: 19,
  },
];

export const NIGHTLIGHT_MODES = [
  {
    id: "moon",
    name: "Moon Glow",
    subtitle: "Calming warm amber aura",
    color: "#f5c96b",
    glow: "0 0 45px rgba(245, 201, 107, 0.55)",
    mood: "Soft amber light designed for heavy eyelids and slow, steady breathing.",
    effect: "Warmth +35%, Nightmare shield +100%",
  },
  {
    id: "cloud",
    name: "Cloud Glow",
    subtitle: "Dreamy lavender periwinkle mist",
    color: "#dcd2f5",
    glow: "0 0 45px rgba(220, 210, 245, 0.6)",
    mood: "Cool, velvety lavender aura that floats through room corners like a sleepy fog.",
    effect: "Calm +45%, Bedtime thoughts +80%",
  },
  {
    id: "star",
    name: "Star Glow",
    subtitle: "Celestial peach and rose gold sparkles",
    color: "#f8dce5",
    glow: "0 0 50px rgba(248, 220, 229, 0.65)",
    mood: "Gentle blush starlight that tickles sleepy toes and keeps midnight monsters away.",
    effect: "Comfort +50%, Sweet dreams +100%",
  },
];

export const SECRET_WISHES = [
  "✦ You received the 'Pocket Starlight Charm': May your heaviest days feel as light as dandelion fluff.",
  "✦ You received the 'Velvet Cloud Blanket': May you always find a cozy corner when the world gets loud.",
  "✦ You received the 'Night-Owl Compass': May your curiosity guide you safely through every dark wood.",
  "✦ You received the 'Midnight Music Box Note': A secret melody that reminds you you are never alone.",
  "✦ You received the 'Pip's Gold Ribbon': Officially certified Junior Dream Helper by Pip!",
];
