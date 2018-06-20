const svgStore = {
  a: `<div class="svg-play">
    <svg width="200" height="300">
        <!-- bedroom -->
        <rect class="br1" x="5" y="5" width="175" height="250" stroke="black" fill="transparent" stroke-width="4" />
        <!-- bed -->
        <rect x="10" y="10" width="75" height="100" stroke="black" fill="transparent" stroke-width="2" />
        <rect x="15" y="15" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
        <rect x="50" y="15" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
        <rect x="10" y="35" width="75" height="5" stroke="black" fill="transparent" stroke-width="2" />
        <!-- furniture -->
        <circle cx="100" cy="22.5" r="10" stroke="black" fill="transparent" stroke-width="2" />
        <!-- bath / closet -->
        <rect x="70" y="155" width="110" height="100" stroke="black" fill="transparent" stroke-width="2" />
        <rect x="70" y="155" width="110" height="30" stroke="black" fill="transparent" stroke-width="2" />
        <line x1="70" y1="170" x2="180" y2="170" stroke="black" stroke-width="1" stroke-dasharray="4" />
        <!-- sink/ toilet -->
        <rect x="75" y="185" width="25" height="20" stroke="black" fill="transparent" stroke-width="2" />
        <rect x="110" y="185" width="20" height="10" stroke="black" fill="transparent" stroke-width="2" />
        <ellipse cx="120" cy="205" rx="7" ry="10" stroke="black" fill="transparent" stroke-width="2" />
        <!-- shower -->
        <rect x="145" y="185" width="35" height="70" stroke="black" fill="transparent" stroke-width="2" />
        <line x1="145" x2="180" y1="185" y2="255" stroke="black" stroke-width="1" />
        <line x1="180" x2="145" y1="185" y2="255" stroke="black" stroke-width="1" />
        <!-- doors -->
        <line x1="15" x2="50" y1="255" y2="235" stroke="black" stroke-width="2.25" />
        <path d="M50 235 Q 60 240 55 255" stroke="black" fill="transparent" stroke-width="1.5" />
    </svg>
</div>`,
  b: `<div class="svg-play">
  <svg width="200" height="300">
      <!-- bedroom -->
      <rect class="br1" x="5" y="5" width="175" height="250" stroke="black" fill="transparent" stroke-width="4" />
      <!-- bed -->
      <rect x="100" y="10" width="75" height="100" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="105" y="15" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="140" y="15" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="100" y="35" width="75" height="5" stroke="black" fill="transparent" stroke-width="2" />
      <!-- furniture -->
      <circle cx="85" cy="22.5" r="10" stroke="black" fill="transparent" stroke-width="2" />
      <!-- bath / closet -->
      <rect x="5" y="155" width="110" height="100" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="5" y="155" width="110" height="30" stroke="black" fill="transparent" stroke-width="2" />
      <line x1="5" y1="170" x2="115" y2="170" stroke="black" stroke-width="1" stroke-dasharray="4" />
      <!-- sink/ toilet -->
      <rect x="85" y="185" width="25" height="20" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="55" y="185" width="20" height="10" stroke="black" fill="transparent" stroke-width="2" />
      <ellipse cx="65" cy="205" rx="7" ry="10" stroke="black" fill="transparent" stroke-width="2" />
      <!-- shower -->
      <rect x="5" y="185" width="35" height="70" stroke="black" fill="transparent" stroke-width="2" />
      <line x1="5" x2="40" y1="180" y2="255" stroke="black" stroke-width="1" />
      <line x1="40" x2="5" y1="185" y2="255" stroke="black" stroke-width="1" />
      <!-- doors -->
      <line x1="170" x2="130" y1="255" y2="235" stroke="black" stroke-width="2.25" />
      <path d="M130 235 Q 120 240 125 255" stroke="black" fill="transparent" stroke-width="1.5" />
  </svg>
</div>`,
  c: `<div class="svg-play">
  <svg width="200" height="300">
      <!-- bedroom -->
      <rect class="br1" x="5" y="5" width="175" height="250" stroke="black" fill="transparent" stroke-width="4" />
      <!-- bed -->
      <rect x="100" y="10" width="75" height="100" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="105" y="15" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="140" y="15" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="100" y="35" width="75" height="5" stroke="black" fill="transparent" stroke-width="2" />
      <!-- furniture -->
      <circle cx="85" cy="22.5" r="10" stroke="black" fill="transparent" stroke-width="2" />
      <!-- bath / closet -->
      <rect x="70" y="155" width="110" height="100" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="70" y="155" width="110" height="30" stroke="black" fill="transparent" stroke-width="2" />
      <line x1="70" y1="170" x2="180" y2="170" stroke="black" stroke-width="1" stroke-dasharray="4" />
      <!-- sink/ toilet -->
      <rect x="75" y="185" width="25" height="20" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="110" y="185" width="20" height="10" stroke="black" fill="transparent" stroke-width="2" />
      <ellipse cx="120" cy="205" rx="7" ry="10" stroke="black" fill="transparent" stroke-width="2" />
      <!-- shower -->
      <rect x="145" y="185" width="35" height="70" stroke="black" fill="transparent" stroke-width="2" />
      <line x1="145" x2="180" y1="185" y2="255" stroke="black" stroke-width="1" />
      <line x1="180" x2="145" y1="185" y2="255" stroke="black" stroke-width="1" />
      <!-- doors -->
      <line x1="15" x2="50" y1="255" y2="235" stroke="black" stroke-width="2.25" />
      <path d="M50 235 Q 60 240 55 255" stroke="black" fill="transparent" stroke-width="1.5" />
  </svg>
</div>`,
  d: `<div class="svg-play">
  <svg width="200" height="300">
      <!-- bedroom -->
      <rect class="br1" x="5" y="5" width="175" height="250" stroke="black" fill="transparent" stroke-width="4" />
      <!-- bed -->
      <rect x="10" y="10" width="75" height="100" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="15" y="15" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="50" y="15" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="10" y="35" width="75" height="5" stroke="black" fill="transparent" stroke-width="2" />
      <!-- furniture -->
      <circle cx="100" cy="22.5" r="10" stroke="black" fill="transparent" stroke-width="2" />
      <!-- bath / closet -->
      <rect x="5" y="155" width="110" height="100" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="5" y="155" width="110" height="30" stroke="black" fill="transparent" stroke-width="2" />
      <line x1="5" y1="170" x2="115" y2="170" stroke="black" stroke-width="1" stroke-dasharray="4" />
      <!-- sink/ toilet -->
      <rect x="85" y="185" width="25" height="20" stroke="black" fill="transparent" stroke-width="2" />
      <rect x="55" y="185" width="20" height="10" stroke="black" fill="transparent" stroke-width="2" />
      <ellipse cx="65" cy="205" rx="7" ry="10" stroke="black" fill="transparent" stroke-width="2" />
      <!-- shower -->
      <rect x="5" y="185" width="35" height="70" stroke="black" fill="transparent" stroke-width="2" />
      <line x1="5" x2="40" y1="185" y2="255" stroke="black" stroke-width="1" />
      <line x1="40" x2="5" y1="185" y2="255" stroke="black" stroke-width="1" />
      <!-- doors -->
      <line x1="170" x2="130" y1="255" y2="235" stroke="black" stroke-width="2.25" />
      <path d="M130 235 Q 120 240 125 255" stroke="black" fill="transparent" stroke-width="1.5" />
  </svg>
</div>`,
  e: `<div class="svg-play">
        <svg width="200" height="300">
            <!-- bedroom -->
            <polygon points="5 5, 140 5, 140 120, 180 120, 180 255, 5 255" stroke="black" fill="transparent" stroke-width="4" />
            <!-- bed -->
            <rect x="10" y="150" width="75" height="100" stroke="black" fill="transparent" stroke-width="2" />
            <rect x="15" y="230" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
            <rect x="50" y="230" width="30" height="15" stroke="black" fill="transparent" stroke-width="2" />
            <rect x="10" y="220" width="75" height="5" stroke="black" fill="transparent" stroke-width="2" />
            <!-- furniture -->
            <circle cx="100" cy="237.5" r="10" stroke="black" fill="transparent" stroke-width="2" />
            <!-- bathroom -->
            <rect x="5" y="5" width="135" height="70" stroke="black" fill="transparent" stroke-width="2" />
            <!-- sink/ toilet -->
            <rect x="80" y="5" width="50" height="20" stroke="black" fill="transparent" stroke-width="2" />
            <rect x="50" y="5" width="20" height="10" stroke="black" fill="transparent" stroke-width="2" />
            <ellipse cx="60" cy="25" rx="7" ry="10" stroke="black" fill="transparent" stroke-width="2" />
            <!-- shower -->
            <rect x="5" y="5" width="35" height="70" stroke="black" fill="transparent" stroke-width="2" />
            <line x1="5" x2="40" y1="5" y2="75" stroke="black" stroke-width="1" />
            <line x1="40" x2="5" y1="5" y2="75" stroke="black" stroke-width="1" />
            <!-- closet -->
            <rect x="5" y="75" width="100" height="30" stroke="black" fill="transparent" stroke-width="2" />
            <line x1="5" y1="90" x2="105" y2="90" stroke="black" stroke-width="1" stroke-dasharray="4" />
        </svg>
    </div>`
};
