import { useEffect, useState } from "react";
import { 
  deletePolyanets, 
  deleteSoloons, 
  deleteCometh, 
  getGoalMap, 
  postCometh, 
  postPolyanets, 
  postSoloons, 
  MegaverseTypes,
  PositionTypes,
} from "./services/services";

interface PromisesArrayTypes {
  callback: (arg: any)=>Promise<void>,
  arg: MegaverseTypes,
  delete: (arg:PositionTypes)=>Promise<void>,
}

async function promisesCreator(prevPromise: PromisesArrayTypes['callback'], arg: MegaverseTypes) {

  const newPromise = new Promise((resolve, reject)=>{
    prevPromise(arg).then((r:any)=>{
      resolve(r)
    }).catch((e:any)=>{
      reject(e)
    })
  })

  return newPromise

}

async function delayFunction() {

  const newPromise =  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('waiting');
    }, 2000);
  });

  return newPromise

}

function App() {

  const [goalMap,setGoalMap] = useState<string[][]>([]);

  useEffect(() => {
    
    (async () => {

      // Getting our goal map in the first render
      const response = await getGoalMap()

      // Seeting out final array in local storage
      setGoalMap(response.goal)

    })();

  },[]);

  useEffect(() => {

    // After getting the final array in the local storage
    // we start to check what paint

    ( async () => {

      ////

      // Checking if goal map is available
      if(goalMap && goalMap.length > 0){
       let promisesArray: PromisesArrayTypes[] = [];
        

       const mapRows = goalMap.map((row, firstIndex) => {

          row.map((element: string, secondIndex: number) => {

            // Creating an array with the callback and the arguments for the promises for each case
            if (element === "POLYANET") {
              const arg = { row: firstIndex, column: secondIndex };
              promisesArray.push({ callback: postPolyanets, arg, delete: deletePolyanets });
            } else if (element === "RED_SOLOON") {
              const arg = { row: firstIndex, column: secondIndex, color: "red" };
              promisesArray.push({ callback: postSoloons, arg, delete: deleteSoloons });
            } else if (element === "BLUE_SOLOON") {
              const arg = { row: firstIndex, column: secondIndex, color: "blue" };
              promisesArray.push({ callback: postSoloons, arg, delete: deleteSoloons });
            } else if (element === "PURPLE_SOLOON") {
              const arg = { row: firstIndex, column: secondIndex, color: "purple" };
              promisesArray.push({ callback: postSoloons, arg, delete: deleteSoloons });
            } else if (element === "WHITE_SOLOON") {
              const arg = { row: firstIndex, column: secondIndex, color: "white" };
              promisesArray.push({ callback: postSoloons, arg, delete: deleteSoloons });
            } else if (element === "UP_COMETH") {
              const arg = { row: firstIndex, column: secondIndex, direction: "up" };
              promisesArray.push({ callback: postCometh, arg, delete: deleteCometh });
            } else if (element === "RIGHT_COMETH") {
              const arg = { row: firstIndex, column: secondIndex, direction: "right" };
              promisesArray.push({ callback: postCometh, arg, delete: deleteCometh });
            } else if (element === "LEFT_COMETH") {
              const arg = { row: firstIndex, column: secondIndex, direction: "left" };
              promisesArray.push({ callback: postCometh, arg, delete: deleteCometh });
            } else if (element === "DOWN_COMETH") {
              const arg = { row: firstIndex, column: secondIndex, direction: "down" };
              promisesArray.push({ callback: postCometh, arg, delete: deleteCometh });
            }

            return element;

          });

          return row;

        })

        // checking if the map cycle is over to prevent triggering calls before ends
        if(mapRows.length === goalMap.length){

           // For in cycle to excute promises 1 by 1 instead use Promises.all to avoid 429
           for (const i in promisesArray) {
            
            // Adding icons to map
            await promisesCreator(promisesArray[i].callback,promisesArray[i].arg).then(r=>r).catch(r=>r)

            // Adding some delay after some request to avoid 429 error
            await delayFunction()
              
          }  

         }
      }
      
      ////

    })();


  },[goalMap])


  return (
    <div>
        Crossmint test.
    </div>
  );
}

export default App;
