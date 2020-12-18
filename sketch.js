  //Create variables here
  var foodS,foodStock,database;
  var dog,happyDog,dogImg,happyImg,foodObj;
  var feed,addFood;
  var fedTime,lastFed;

function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png");
  happyImg=loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  foodObj=new Food()
  foodStock=database.ref('Food');
  foodStock.on("value",readStock)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(dogImg);
  dog.scale=0.2;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}

function draw() {  
  background("deeppink");

  //if(keyWentDown(UP_ARROW)){
  //writeStock(foodS);
  //dog.addImage(happyImg);
  //}else if(keyWentUp(UP_ARROW)){
  //dog.addImage(dogImg);
  //}

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val()
  });
  fill("white")
  textSize(15);
  if(lastFed>=12){
  text("Last Feed:"+ lastFed%12 +"PM",200,30);
  }else if(lastFed==0){
  text("Last Feed: 12 AM",200,30)
  }else{
    text("Last Feed:"+ lastFed +"AM",200,30);
  }
  
  

  drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyImg);

foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
  })
}

  function addFoods(){
foodS++
database.ref('/').update({
  Food:foodS 
  })
}




