// Write code here that will find the solution count for a board of any size.
// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)

window.findNRooksSolution = function(n){
  var solution = createMatrix(n);
  console.log('Single solution for ' + n + ' rooks:', solution);
  return solution;
};

window.countNRooksSolutions = function(n){
  //create hashTable of solutions
  //createMatrix(n);
  //nested for loop: swap "row" i with "row" j
  //enter swapped matrix into hashtable
  //for in loop to get count.
  var solutions = {};
  var matrix = matrixArray(n);
  for (var i = 0; i < n; i++){
    for (var j = 0; j < n; j++){
      var temp = matrix[i];
      matrix[i] = matrix[j];
      matrix[j] = temp;
      solutions[matrix] = true;
    }
  }
  var solutionCount = 0; //fixme
  for (var key in solutions){
    solutionCount++;
  }
  n===0 && (solutionCount = 1);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n){
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};

window.countNQueensSolutions = function(n){
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// This function uses a board visualizer lets you view an interactive version of any piece matrix.

window.displayBoard = function(matrix){
  $('body').html(
    new BoardView({
      model: new Board(matrix)
    }).render()
  );
};

//our functions
var makeRow = function(n){
  return _(_.range(n)).map(function(){
    return 0;
  });
};

//As no two Rooks or Queen can occupy a singe row or column
//permutations of n rows each with a piece placed in
//different colums will be sufficinet to solve for 
//row and column conflicts.
//The returned matrix keys correspond to a unique array that
//indicates the position of the piece.
var createMatrix = function(n){
  var matrix = {};
  for(var i = 0; i < n; i++){
    var emptyRow = makeRow(n);
    matrix[i] = {};
    emptyRow[i] = 1;
    matrix[i] = emptyRow;
  }
  return matrix;
};

//An array of n lenght that corresponds to the positions of the rows
//in the matrix created above.
var matrixArray = function(n){
  var result =[];
  for (var i = 0; i < n; i++){
    result.push(i);
  }
  return result;
};