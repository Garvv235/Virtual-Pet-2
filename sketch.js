var dog, happyDog,dogImg, database, foodS, foodStock
var fedTime,lastFed;
var feed,addFood;
var foodObj;

function preload()
{
 dogImg = loadImage("sprites/Dog.png");
 happyDog = loadImage("sprites/happydog.png");
}

function setup() {
	database = firebase.database();
  
  createCanvas(500, 500);

  foodObj = new Food();
  
  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  foodStockRef = database.ref('Food');
  foodStockRef.on("value",readStock);

}


function draw() {  
  background(46, 139, 87);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

  
  

  drawSprites();
  fill(255,255,254);
  stroke("white");
  text("Food left :"+foodS,170,200);
  textSize(13);
  text("Note : Press Up Arrow key to feed milk to John",130,300);


}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  }
  function feedDog(){
    dog.addImage(happyDog);
  
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
  
  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }

