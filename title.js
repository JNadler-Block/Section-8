class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload(){
        this.load.image('rolypoly','rolypoly.png');
        this.load.image('snail','snail.png');
        this.load.image('fairy','fairy.png');
        this.load.image('title','title.png');
        this.load.image('background','background.png');
    }  
    create() {
        this.background = this.add.sprite(0, 0, 'background').setOrigin(0, 0).setDepth(-1);
        this.title = this.add.sprite(640, -100, 'title');
        this.rolypoly = this.add.sprite(640, 1000, 'rolypoly')
        .setInteractive()
        .setScale(0.6)
        .on('pointerover', () => this.tweens.add({targets: this.rolypoly, scale: 0.8, duration: 500, ease: 'Bounce.Out'}))
        .on('pointerout', () => this.tweens.add({targets: this.rolypoly, scale: 0.6, duration: 333, ease: 'Cubic.InOut'}))
        .on('pointerdown', () => this.scene.start('victory'));
        this.fairy = this.add.sprite(-300, 200, 'fairy').setScale(0.5);
        this.snail = this.add.sprite(-200, 600, 'snail').setScale(.6);
        
        this.time.delayedCall(500, () => {
            this.tweens.add({targets: this.title, y: 80, duration: 1000, ease: 'Cubic.Out'});
            this.tweens.add({targets: this.rolypoly, y: 400, duration: 1500, ease: 'Cubic.Out'});
        })
        
        this.time.delayedCall(1500, () => {
            this.tweens.add({
                targets: this.title,
                y: 70,
                duration: 750,
                ease: 'Sine.InOut',
                yoyo: true,
                repeat: -1
            });
            this.tweens.add({
                targets: this.fairy,
                x: 1580,
                duration: 2000,
                yoyo: true,
                repeat: -1
            });
            this.tweens.add({
                targets: this.fairy,
                y: 250,
                duration: 400,
                ease: 'Sine.InOut',
                yoyo: true,
                repeat: -1
            });
            this.tweens.add({
                targets: this.snail,
                x: 1480,
                duration: 10000,
                yoyo: true,
                repeat: -1
            });
            this.time.addEvent({
                delay: 2000,
                repeat: -1,
                callback: () => this.fairy.setScale(-this.fairy.scaleX, 0.5)
            })
            this.time.addEvent({
                delay: 10000,
                repeat: -1,
                callback: () => this.snail.setScale(-this.snail.scaleX,.6)
            })
            this.time.addEvent({
                delay: 6250,
                repeat: -1,
                callback: () => this.tweens.add({targets: this.rolypoly, x: 630, duration: 50, yoyo: true, repeat: 2})
            })
        })
        this.input.on('pointerdown', () => this.scene.start('victory'))
    }
}

class Victory extends Phaser.Scene {
    constructor() {
        super('victory');
    }

    preload() {
        this.load.image('rolypoly','rolypoly.png');
        this.load.image('victory','victory.png');
    }
        
    create() {
        this.rolypoly = this.add.sprite(-200, 600, 'rolypoly').setScale(0.6);

        this.victory = this.add.sprite(640, 150, 'victory');
        this.button = this.add.text(640, 300, 'Press To Restart', {font: '40px Arial', color: '#000'}).setOrigin(.5);
  
        this.button.setInteractive();
  
        this.button.on('pointerdown', () => {
            this.scene.start('title');
        })
        .on('pointerover', () => {
            this.button.setFontSize(50);
        })
        .on('pointerout', () => {
            this.button.setFontSize(40);
        });

        this.tweens.add({
            targets: this.rolypoly,
            x: 640,
            duration: 1000,
            ease: 'Sine.Out'
        })

    }
}

const game = new Phaser.Game({
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    backgroundColor: 0xffc6fa,
    physics: {
        default: 'arcade',
        arcade: {debug: true, gravity: {x:0, y:100}}
    },
    scene: [ Title, Victory ],
    title: "Roly Poly Pride Month",
});
