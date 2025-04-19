class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.leg_l = this.add.sprite(this.bodyX - 60, this.bodyY + 100, "monsterParts", "leg_blueC.png");
        my.sprite.leg_l.flipX = true;
        my.sprite.leg_r = this.add.sprite(this.bodyX + 60, this.bodyY + 100, "monsterParts", "leg_blueC.png");
        my.sprite.arm_l = this.add.sprite(this.bodyX - 90, this.bodyY + 60, "monsterParts", "arm_blueE.png");
        my.sprite.arm_l.flipX = true;
        my.sprite.arm_r = this.add.sprite(this.bodyX + 90, this.bodyY + 60, "monsterParts", "arm_blueE.png");
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_redD.png");
        my.sprite.mouth_smile = this.add.sprite(this.bodyX, this.bodyY + 40, "monsterParts", "mouth_closed_happy.png");
        my.sprite.mouth_fang = this.add.sprite(this.bodyX, this.bodyY + 40, "monsterParts", "mouth_closed_fangs.png");
        my.sprite.mouth_fang.visible = false;
        my.sprite.eye = this.add.sprite(this.bodyX, this.bodyY - 20, "monsterParts", "eye_human_blue.png");
        my.sprite.horn_l = this.add.sprite(this.bodyX - 50, this.bodyY - 70, "monsterParts", "detail_white_horn_small.png");
        my.sprite.horn_l.flipX = true;
        my.sprite.horn_r = this.add.sprite(this.bodyX + 50, this.bodyY - 70, "monsterParts", "detail_white_horn_small.png");

        this.dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.fkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        this.skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        // polling input: movement
        if(this.dkey.isDown){
            for(let image in my.sprite) {
                my.sprite[image].x += 0.2;
            }
        }
        if(this.akey.isDown){
            for(let image in my.sprite) {
                my.sprite[image].x -= 0.2;
            }
        }

        //Event input: dimple smile
        this.fkey.on('down', (key, event) => {
            my.sprite.mouth_fang.visible = true;
            my.sprite.mouth_smile.visible = false;
        })

        //Event input: regular smile
        this.skey.on('down', (key, event) => {
            my.sprite.mouth_smile.visible = true;
            my.sprite.mouth_fang.visible = false;
        })
    }

}