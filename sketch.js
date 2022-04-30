let submitBttn, inputField; //variables for text input & send button
let bot = new RiveScript(); //creating a new bot
let responses; //variable for bot response
let score; //variable to check whether user has won or lost

let stage = 1; //setting stage to 1 (title)

let font;

let room1, room2, room3, room4 = 0;

let inventory = 0;

let clue1, clue2, clue3a, clue3b, clue4 = 0;
let key1, key2, key3 = 0;
let keyRed, keyGreen, keyBlue = 0; //variables to check if responses match

let iclue1, iclue2, iclue3a, iclue3b, iclue4;
let ikey1, ikey2, ikey3;
let ikeyRed, ikeyGreen, ikeyBlue;
let medal;

function preload() {
  bot.loadFile("bot.txt").then(botLoaded).catch(error);
  font = loadFont("dpcomic.ttf");
  iclue1 = loadImage("clue1.png");
  iclue2 = loadImage("clue2.png");
  iclue3a = loadImage("clue3a.png");
  iclue3b = loadImage("clue3b.png");
  iclue4 = loadImage("clue4.png");
  ikey1 = loadImage("keyblank.png");
  ikey2 = loadImage("keyblank.png");
  ikey3 = loadImage("keyblank.png");
  ikeyRed = loadImage("keyred.png");
  ikeyGreen = loadImage("keygreen.png");
  ikeyBlue = loadImage("keyblue.png");
  medal = loadImage("medal.png"); //preloading all the graphics & fonts
}

function botLoaded() {
  console.log("Chatbot loaded!");
  bot.sortReplies();
}

function error(_error) {
  console.log(_error);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  responses = "Hello?";

  let col1 = color(0, 10, 33);
  let col2 = color(200, 245, 255);

  inputField = createInput();
  inputField.position(width / 3 - 105, (3 * height) / 4 + 60);
  inputField.size(350, 30);
  inputField.style("background-color", col1);
  inputField.style("color", col2);

  submitBttn = createButton("SEND");
  submitBttn.position(width / 3 - 105 + inputField.width + 10, (3 * height) / 4 + 60);
  submitBttn.size(55, inputField.height);
  submitBttn.mousePressed(chat); //press button to send text to bot
  submitBttn.style("background-color", col2);
  submitBttn.style("color", col1);
}

function chat() {
  let input = inputField.value();
  bot.reply("local-user", input).then(respond);
  inputField.value(""); //erasing input field after pressing send/enter
}

function keyPressed() {
  if (keyCode == ENTER) {
    chat(); //press enter to send text to the bot
  }
}

function respond(reply) {
  responses = reply;
  console.log(responses);
}

function draw() {
  console.log(stage, score, clue1, clue2, clue3a, clue3b, clue4, room1, room2, room3, room4);
  textFont(font);
  if (stage == 1) {
    title();
  } else if (stage == 2) {
    intro();
  } else if (stage == 3) {
    questions();
  } else if (stage == 4) {
    end1();
  } else if (stage == 5) {
    end2(); //setting stages to each page's function
  }

  if (responses == "Nice job! You managed to get it in one try!") {
    score = 1;
  } else if (
    responses == "Wow! That could have ended badly, but you got it!") {
    score = 1;
  } else if (responses == "Phew! That was a very close call...") {
    score = 1;
  } else if (responses == "That's three wrong. Uh oh...") {
    score = 0;
  } //setting score based on if user has won or lost
}

function mousePressed() {
  if (stage == 1) {
    stage = 2;
  } else if (stage == 2) {
    stage = 3;
  } else if (stage == 3) {
    if (score == 1) {
      stage = 4;
    } else if (stage == 3) {
      if (score == 0) {
        stage = 5; 
      } else if (stage == 4) {
        stage = 1;
      } else if (stage == 5) {
        stage = 1; //click to advance to next page when done
      }
    }
  }
}

function title() { //title page
  background(0, 10, 33);
  fill(200, 245, 255);
  rectMode(CENTER);
  textAlign(CENTER);
  push();
  strokeWeight(3);
  stroke(60, 200, 210);
  textSize(70);
  text("Welcome to The Vault", width / 2, (2 * height) / 5);
  pop();
  textSize(20);
  text("Click anywhere to begin", width / 2, (5 * height) / 6);

  inputField.hide();
  submitBttn.hide();
}

function intro() { //introduction page with backstory
  background(0, 10, 33);
  push();
  fill(200, 245, 255);
  textSize(25);
  textAlign(LEFT);
  text(
    "Welcome to the year 2097, where the company Solane Inc. has been developing technology to enhance all human senses via a small implant in the wrist. This technology would be a lucrative game changer for the company. However, an unnamed source inside the company has revealed that these implants may work at first, but tests have shown that it will eventually take over the user's mind and will act as a form of mass mind control. In an unfortunate turn of events, that source has presumably gone missing as we have lost all contact.",
    width / 2,
    height / 5,
    width - 175
  );
  text(
    "This source has been gathering information and proof over the last few months in a vault at an undisclosed location in the case that something like this would happen. However, the vault can only be accessed after solving a series of puzzles that we do not have the solutions to. You have been hired to recover the contents of that vault to stop the release of Solane Inc.'s technology before it is too late. Fortunately, the source's AI assistant, Vaultroid, will be there to help guide you through it. I have to warn you though, the final combination lock to open the vault has been rigged to detonate after three attempts, so please be careful. We are about to arrive... are you ready?",
    width / 2,
    (4 * height) / 9,
    width - 175
  );
  pop();
  textSize(20);
  text("Click anywhere to enter", width / 2, (5 * height) / 6);

  inputField.hide();
  submitBttn.hide();
}

function questions() { //main game page where user chats with bot
  background(0, 10, 33);
  push();
  fill(200, 245, 255);
  strokeWeight(2);
  stroke(60, 200, 210);
  textSize(50);
  textAlign(LEFT);
  text("Vaultroid", width / 12, (1 * height) / 6);
  pop();
  push();
  fill(200, 245, 255);
  textSize(25);
  textAlign(LEFT);
  rectMode(CORNER);
  text(responses, width / 12, height / 4 + 30, width / 2);
  pop();

  inputField.show();
  submitBttn.show();

  if (
    responses ==
    "The piece of paper has a number puzzle written on it. Let's keep that for later. What should we look at next?") {
    clue1 = 1;
  } else if (responses == "Looks like that worked! There are three keys in the chest. Let's take them with us, they might come in handy. I think we've gotten everything we need to get past this room. Should we take a look at the door again, yes or no?") {
    clue1 = 0; //setting variable to determine whether to display clue1
  }
  if (clue1 == 1) {
    image(iclue1, 2 * width / 3 - 50, height / 4 + 60, width / 3 - 50, width / 3 - 50); //displaying clue1
  }

  if (responses == "The red one worked! The locker seems to have a card with a word puzzle on it, let's keep that for later. What should we look at next?") {
    clue2 = 1;
  } else if (responses == "That worked! It looks like we've entered the third room. There is a safe in the corner, a picture frame on the wall, and of course, the locked door. What should we examine first?") {
    clue2 = 0;
  }
  if (clue2 == 1) {
    image(iclue2, 2 * width / 3 - 50, height / 4 + 60, width / 3 - 50, width / 3 - 50);
  }

  if (responses == "I think this abstract looking map is a clue. I will take a picture of this for later, just in case. What should we look at now?") {
    clue3a = 1;
  } else if (responses == "It worked! We've opened the door, and we've made it to the fourth and last room! It looks like there's just the vault and an interesting pattern on the tiles. Which should we look at first?") {
    clue3a = 0;
  }
  if (clue3a == 1) {
    image(iclue3a, 2 * width / 3 - 50, height / 4 + 60, width / 3 - 50, width / 3 - 50);
  }

  if (responses == "The green key opened the safe! It looks like there is a small piece of paper with writing on it inside the safe. Let's save this for later. Should we look at the picture frame or the door next?") {
    clue3b = 1;
  } else if (responses == "It worked! We've opened the door, and we've made it to the fourth and last room! It looks like there's just the vault and an interesting pattern on the tiles. Which should we look at first?") {
    clue3b = 0;
  }
  if (clue3b == 1) {
    image(iclue3b, 2 * width / 3 - 50, height / 4 + 60 + (width / 3 - 50), width / 3 - 50, width / 3 - 50);
  }

  if (responses == "These tiles look like a puzzle. I will take a picture of it for us to examine it more closely. What should we look at next?") {
    clue4 = 1;
  } else if (responses == "It worked! Now we just have one more step to open the vault. This time we need to press these three buttons in order to make a three color passcode. There is a red button, a green button, and a blue button. These colors seem pretty familiar... Make sure to tell me just the three colors in order, each separated by a space (e.g. 'red green blue'). Please be careful though, we only have 3 tries to get it right, otherwise the whole place will blow...") {
    clue4 = 0;
  }
  if (clue4 == 1) {
    image(iclue4, 2 * width / 3 - 50, height / 4 + 60, width / 3 - 50, width / 3 - 50);
  }

  if (responses == "Nice to meet you. I'm the AI assistant that will help you solve the series of puzzles to unlock the vault. There are four different rooms that we will have to get through, the final one holds the vault. We have just entered the first room. There's the door that we have to get through, but it has a lock on it. There's also a desk to your left and a chest to the right. What should we look at first?") {
    room1 = 1;
  } else if (responses == "Blue is the perfect fit! The first door has been opened. It seems like we will have to find our way through the second room now. There is a locker in the middle, a lamp, and the door that we will have to get through. What should we look at first?") {
    room1 = 0;
    room2 = 1;
  } else if (responses == "That worked! It looks like we've entered the third room. There is a safe in the corner, a picture frame on the wall, and of course, the locked door. What should we examine first?") {
    room2 = 0;
    room3 = 1;
  } else if (responses == "It worked! We've opened the door, and we've made it to the fourth and last room! It looks like there's just the vault and an interesting pattern on the tiles. Which should we look at first?") {
    room3 = 0;
    room4 = 1;
  } else if (responses == "It worked! Now we just have one more step to open the vault. This time we need to press these three buttons in order to make a three color passcode. There is a red button, a green button, and a blue button. These colors seem pretty familiar... Make sure to tell me just the three colors in order, each separated by a space (e.g. 'red green blue'). Please be careful though, we only have 3 tries to get it right, otherwise the whole place will blow...") {
    room4 = 0; //setting variable to determine what room user is in
  }

  fill(200, 245, 255);
  textSize(20);
  textAlign(LEFT);

  if (room1 == 1) {
    text("Places: door, desk, chest", width / 3 - 100, (3 * height) / 4 + 47);
  }
  if (room2 == 1) {
    text("Places: door, locker, lamp", width / 3 - 100, (3 * height) / 4 + 47);
  }
  if (room3 == 1) {
    text("Places: safe, picture frame, door", width / 3 - 100, (3 * height) / 4 + 47);
  }
  if (room4 == 1) {
    text("Places: vault, tiles", width / 3 - 100, (3 * height) / 4 + 47); //displaying options of places to visit in each room
  }

  if (responses == "Nice to meet you. I'm the AI assistant that will help you solve the series of puzzles to unlock the vault. There are four different rooms that we will have to get through, the final one holds the vault. We have just entered the first room. There's the door that we have to get through, but it has a lock on it. There's also a desk to your left and a chest to the right. What should we look at first?") {
    inventory = 1; //setting variable to determine whether "inventory" title should be displayed
  }

  textSize(25);

  if (inventory == 1) {
    text("Inventory:", 2 * width / 3 - 50, height / 6 + 25); //displaying "inventory" title
    push();
    rectMode(CORNER);
    strokeWeight(1);
    stroke(200, 245, 255);
    noFill();
    rect(2 * width / 3 - 55, height / 6 + 35, width / 3 - 40, width / 3 + 120);
    pop(); //displaying inventory box
  }

  if (responses == "Looks like that worked! There are three keys in the chest. Let's take them with us, they might come in handy. I think we've gotten everything we need to get past this room. Should we take a look at the door again, yes or no?") {
    keyRed = 1;
    keyGreen = 1;
    keyBlue = 1;
  } else if (responses == "Blue is the perfect fit! The first door has been opened. It seems like we will have to find our way through the second room now. There is a locker in the middle, a lamp, and the door that we will have to get through. What should we look at first?") {
    keyBlue = 0;
    key3 = 1;
  } else if (responses == "The red one worked! The locker seems to have a card with a word puzzle on it, let's keep that for later. What should we look at next?") {
    keyRed = 0;
    key1 = 1;
  } else if (responses == "The green key opened the safe! It looks like there is a small piece of paper with writing on it inside the safe. Let's save this for later. Should we look at the picture frame or the door next?") {
    keyGreen = 0;
    key2 = 1; //setting variables to show each color key when obtained and then blank outline when used
  }

  if (keyRed == 1) {
    image(ikeyRed, 2 * width / 3 - 25, height / 4 - 20, (width / 3 - 50) / 3 - 50, (width / 3 - 50) / 3 - 50);
  }
  if (keyGreen == 1) {
    image(ikeyGreen, 2 * width / 3 + (width / 3 - 50) / 3 - 25, height / 4 - 20, (width / 3 - 50) / 3 - 50, (width / 3 - 50) / 3 - 50);
  }
  if (keyBlue == 1) {
    image(ikeyBlue, 2 * width / 3 + 2 * ((width / 3 - 50) / 3) - 25, height / 4 - 20, (width / 3 - 50) / 3 - 50, (width / 3 - 50) / 3 - 50);
  }
  if (key1 == 1) {
    image(ikey1, 2 * width / 3 - 25, height / 4 - 20, (width / 3 - 50) / 3 - 50, (width / 3 - 50) / 3 - 50);
  }
  if (key2 == 1) {
    image(ikey2, 2 * width / 3 + (width / 3 - 50) / 3 - 25, height / 4 - 20, (width / 3 - 50) / 3 - 50, (width / 3 - 50) / 3 - 50);
  }
  if (key3 == 1) {
    image(ikey3, 2 * width / 3 + 2 * ((width / 3 - 50) / 3) - 25, height / 4 - 20, (width / 3 - 50) / 3 - 50, (width / 3 - 50) / 3 - 50); //displaying key icons
  }

  textAlign(CENTER);
  if (score == 1) {
    textSize(20);
    text("Click anywhere to finish the game", width / 2, (5 * height) / 6 + 70);
  } else if (score == 0) {
    textSize(20);
    text("Click anywhere to finish the game", width / 2, (5 * height) / 6 + 70); //displaying instructions to finish game
  }
}

function end1() { //end page if user wins
  background(0, 10, 33);
  fill(200, 245, 255);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(40);
  push();
  strokeWeight(2);
  stroke(60, 200, 210);
  text("You Did It!", width / 2, height / 5);
  pop();
  textSize(25);
  textAlign(LEFT);
  text(
    "You were able to successfully recover the contents of the vault! Our source had managed to collect multiple counts of communication between different superiors at Solane Inc., clearly admitting to the mind control effects of their implant as well as the results to their implant tests. Thanks to your efforts and bravery, we were able to take all of the evidence sealed inside and effectively put a stop to Solane Inc.'s release of their dangerous technology. As a token of our gratitude, we would like to honor you with this medal and financially compensate you for your troubles. Thank you, once again.",
    width / 2,
    height / 4 + 50,
    width - 175
  );
  image(medal, 5 * width / 12, 3 * height / 5 - 30, width / 6, width / 6);
  inputField.hide();
  submitBttn.hide();
}

function end2() { //end page if user loses
  background(0, 10, 33);
  fill(200, 245, 255);
  rectMode(CENTER);
  textAlign(CENTER);
  textSize(40);
  push();
  strokeWeight(2);
  stroke(60, 200, 210);
  text("You Lost", width / 2, height / 5);
  pop();
  textSize(25);
  textAlign(LEFT);
  text(
    "Unfortunately you weren't able to figure out the last code to unlock the vault. While the vault has detonated anything in the vicinity, the contents are still safe, but locked inside the vault. As a result, the fate of the future still hangs in the balance as Solane Inc. prepares to release their mass mind control technology...",
    width / 2,
    height / 4 + 50,
    width - 175
  );
  inputField.hide();
  submitBttn.hide();
}