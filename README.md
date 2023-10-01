<div align="center">
  <picture>
  <img alt="Wavebreaker Frontend logo" src="./.github/assets/wavebreaker_icon.png" width="25%" height="25%">
</picture>

Frontend for <a href="https://github.com/AudiosurfResearch/Wavebreaker">Wavebreaker</a>, a reimplementation of Audiosurf's online services.

</div>

#

> [!NOTE]
> There is a main public instance of Wavebreaker and its frontend running at https://wavebreaker.arcadian.garden/.

### Developing

Once you've cloned the project and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open

# to expose the server to the local network
npm run dev -- --host
```

### Building

To create a production version:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

### Thanks

This project uses a few things from ScoreSaber's frontend (like the entirety of src/lib/utils/accio), which is open-source and licensed under the MIT license.

README format shamelessly stolen from [ezekielathome](https://github.com/ezekielathome). Cool stuff!
