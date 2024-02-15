class Example extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image("plane", "assets/sprites/plane.png");
        this.load.image("sky", "assets/skies/bigsky.png");
    }

    create() {
        this.add.image(400, 300, "sky").setScrollFactor(0);

        this.graphics = this.add.graphics();

        this.bottomPath = new Phaser.Curves.Path(
            0,
            Phaser.Math.Between(400, 500)
        );

        this.currentX = 600;

        this.plane = this.add.image(600, 300, "plane");

        //  Create a random land which is 1000px long (800 for our screen size + 200 buffer)


        for (let x = 200; x <= 1000; x += 200) {
            let by = Phaser.Math.Between(400, 500);
            this.bottomPath.lineTo(x, by);

        }

        this.offset = 0;
    }

    update() {
        //  Scroll the camera at a fixed speed
        const speed = 4;

        this.cameras.main.scrollX += speed;
        this.plane.x += speed;
        this.currentX += speed;
        this.offset += speed;

        //  Every 200 pixels we'll generate a new chunk of land
        if (this.offset >= 200) {
            //  We need to generate a new section of the land as we've run out
            let by = Phaser.Math.Between(400, 500);

            const bottomEnd = this.bottomPath.getEndPoint();

            this.bottomPath.lineTo(bottomEnd.x + 200, by);

            this.offset = 0;
        }

        //  Get the position of the plane on the path
        const x =
            this.currentX / (1000 + this.cameras.main.scrollX - this.offset);

        const bottom = this.bottomPath.getPoint(x);

        //  Draw it
        this.graphics.clear();

        //  This will give a debug draw style with just lines:

        this.plane.y = bottom.y;

        //  And this will give a filled Graphics landscape:
        this.drawLand(this.bottomPath, 600);
    }

    drawLand(path, offsetY) {
        const points = [{ x: 0, y: offsetY }];

        let lastX;

        for (let i = 0; i < path.curves.length; i++) {
            const curve = path.curves[i];

            points.push(curve.p0, curve.p1);

            lastX = curve.p1.x;
        }

        points.push({ x: lastX, y: offsetY });

        this.graphics.fillStyle(0x7b3a05);
        this.graphics.fillPoints(points, true, true);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#efefef",
    parent: "phaser-example",
    scene: Example,
};

const game = new Phaser.Game(config);
