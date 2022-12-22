class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.image('bg', 'assets/skies/darkstone.png');
        this.load.image('flare', 'assets/particles/white-flare.png');
        this.load.image('fox', 'assets/pics/card3.png');
    }

    create ()
    {
        this.add.image(400, 300, 'bg');

        const card = this.add.image(400, 300, 'fox').setInteractive();

        const emitZone1 = { type: 'edge', source: card.getBounds(), quantity: 42 };

        const particles = this.add.particles('flare');

        const emitter = particles.createEmitter({
            speed: 24,
            lifespan: 1500,
            quantity: 10,
            scale: { start: 0.4, end: 0 },
            // advance: 2000,
            on: false,
            emitZone: emitZone1,
            duration: 500
        });

        card.on('pointerover', () => {

            emitter.start(2000);

        });

        particles.on('emitterstart', () => {
            console.log('emission start');
        });

        particles.on('emittercomplete', () => {
            console.log('emission over');
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);