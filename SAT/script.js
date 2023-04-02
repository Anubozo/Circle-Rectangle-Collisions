let width = 700;
let height = 700;
let circle;
let r = 40;
let collision = false;
let color = (255);
let pts;

let rectangle;

function setup(){
    createCanvas(width, height);
    rectangle = new Rectangle(width/2, width/2, Math.PI/4, 250, 100);
    angleMode(DEGREES);
    frameRate(30);
}

function draw(){
    background(0);
    fill(color);
    stroke(255);
    circle = ellipse(mouseX, mouseY,r);


    rectangle.display();
    rectangle.a+=0.05;


    collision = detectCollision(mouseX, mouseY,r,pts)




    if(collision){
        color = "#FF0000";
    } else {
        color = (255);
    }
}

class Rectangle {
    constructor(x,y,a,w,l){
        this.x = x;
        this.y = y;
        this.a = a;
        this.w = w;
        this.l = l;
    }

    display(){
        fill(255);
        let dist = Math.sqrt(this.w*this.w+this.l+this.l);
        dist = dist/2;

        let mainAngle = Math.atan2(this.l,this.w);
        let compAngle = Math.PI/2-mainAngle;
        let offsets = [
            [dist*Math.cos(Math.PI/2 + this.a + mainAngle),                               dist*Math.sin(Math.PI/2 + this.a + mainAngle)],
            [dist*Math.cos(Math.PI/2 + this.a + mainAngle + 2 * compAngle),               dist*Math.sin(Math.PI/2 + this.a + mainAngle + 2 * compAngle)],
            [dist*Math.cos(Math.PI/2 + this.a + mainAngle + Math.PI),                     dist*Math.sin(Math.PI/2 + this.a + mainAngle + Math.PI)],
            [dist*Math.cos(Math.PI/2 + this.a + mainAngle + 2 * compAngle + Math.PI),     dist*Math.sin(Math.PI/2 + this.a + mainAngle + 2 * compAngle + Math.PI)],
        ]

        pts = [
            [this.x + offsets[0][0],this.y + offsets[0][1]],
            [this.x + offsets[1][0],this.y + offsets[1][1]],
            [this.x + offsets[2][0],this.y + offsets[2][1]],
            [this.x + offsets[3][0],this.y + offsets[3][1]]

        ];

        for(let i = 0; i < 4; i++){
            fill(255);
            ellipse(pts[i][0],pts[i][1],5);
            stroke(255);
            line(pts[i][0],pts[i][1],pts[(i+1)%4][0],pts[(i+1)%4][1]);
        }



    }
}


function detectCollision(circleX, cricleY, circleR, rectCorners){
    let collision = true;

    for(let i = 0; i < 4; i++){
        let pointA = rectCorners[i];
        let pointB = rectCorners[(i+1)%4];
        let edge = [pointB[0]-pointA[0], pointB[1]-pointA[1]];
        let axis = [-edge[1], edge[0]];
        stroke(0,255,0);
        line(pointA[0],pointA[1],pointB[0],pointB[1]);

        let minR, maxR, minC, maxC;

        // Circle Min-Max
        let normalizedVector = normalize(axis, circleR/2);

        let circlePoints = [
            [circleX-normalizedVector[0], cricleY-normalizedVector[1]],
            [circleX+normalizedVector[0], cricleY+normalizedVector[1]]
        ];
        let values = [
            math.dot(axis,circlePoints[0]),
            math.dot(axis,circlePoints[1])
        ]

        if(values[0]<values[1]){
            minC = values[0];
            maxC = values[1];
        } else {
            minC = values[1];
            maxC = values[0];
        }


        // Rectangle Min-Max

        for(let j = 0; j < 4; j++){
            let value = math.dot(axis,rectCorners[j]);
            if(j==0){
                minR = value;
                maxR = value;
            }
            if(value>maxR){
                maxR = value;
            }
            if(value<minR){
                minR = value;
            }
        }

        if(minC>maxR || maxC<minR){
            collision=false;
        }


        fill(0,0,255);
        ellipse(circlePoints[0][0], circlePoints[0][1],10);
        ellipse(circlePoints[1][0], circlePoints[1][1],10);

        
        

    }

    



    return collision;
}

function normalize(vector, r){
    let magnitude = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1]);
    let tempVector = [vector[0]/magnitude*r, vector[1]/magnitude*r];
    return tempVector;
}