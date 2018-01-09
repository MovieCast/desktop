<h1 align="center">MovieCast</h1>

<h4 align="center">Streaming movies and shows has never been easier!</h4>

<p align="center">
  <a href="https://travis-ci.org/MovieCast/desktop"><img src="https://img.shields.io/travis/MovieCast/desktop/master.svg" alt="TravisCI"></a>
  <a href="https://github.com/MovieCast/desktop/releases"><img src="https://img.shields.io/github/release/MovieCast/desktop.svg" alt="Github Releases"></a>
  <a href="https://david-dm.org/MovieCast/desktop"><img src="https://img.shields.io/david/MovieCast/desktop.svg" alt="Dependency Status"></a>
  <a href="https://david-dm.org/MovieCast/desktop?type=dev"><img src="https://img.shields.io/david/dev/MovieCast/desktop.svg" alt="devDependency Status"></a>
</p>

## Install

Download the latest beta of MovieCast from the
[GitHub releases](https://github.com/webtorrent/webtorrent-desktop/releases) page.

MovieCast is currently in beta and is activly being developed. You can try out the unstable development version of MovieCast by cloning the Git repo. Check out the ["How to Contribute"](#how-to-contribute) section for instructions on how to build MovieCast.

## How to Contribute

In the examples below we used yarn as package manager, npm should work just fine.

### Get the code

```
$ git clone https://github.com/MovieCast/desktop.git moviecast-desktop
$ cd moviecast-desktop
$ yarn or npm install
```

### Run MovieCast

```
$ yarn dev
```
>NOTE: MovieCast's src folder is split in three folders: main, renderer and shared.
Whenever you change code in the main or shared folder be sure to rerun this command.
If you change something in the renderer folder MovieCast will auto refresh.

### Run eslint

```
$ yarn lint
```

### Package the app

Builds app binaries for Mac, Linux, and Windows.
Builds the app binaries for the current platform

```
$ yarn package
```

To build for all platforms:

```
$ yarn package:all
```

And to build for one specific platform:

```
$ npm run package:[platform]
```

Where `[platform]` is `darwin`, `linux`, `win`, or `all`.

## Community

To keep track of MovieCast's development and community activity you can:

* Follow MovieCast on [Twitter](https://twitter.com/MovieCastNews).
* Join in discussions on the [MovieCast Sub Reddit](https://reddit.com/r/MovieCast/)
* Join our [Discord Guild](https://discord.gg/bcSzx7M), we are the most active here.

## License

MIT. Copyright (c) [MovieCast](https://moviecast.xyz).
