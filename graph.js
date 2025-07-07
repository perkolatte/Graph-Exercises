class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // Adds node to graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // Adds multiple nodes to graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // Connects two nodes
  addEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.add(v2);
      v2.adjacent.add(v1);
    }
  }

  // Disconnects two nodes
  removeEdge(v1, v2) {
    if (this.nodes.has(v1) && this.nodes.has(v2)) {
      v1.adjacent.delete(v2);
      v2.adjacent.delete(v1);
    }
  }

  // Removes a node and its connections
  removeVertex(vertex) {
    if (this.nodes.has(vertex)) {
      for (const adjacent of vertex.adjacent) {
        this.removeEdge(vertex, adjacent);
      }
      this.nodes.delete(vertex);
    }
  }

  // Returns an array of Node values
  // Uses the supplied callback to determine next node to retrieve
  _traverse(start, getNext) {
    if (!this.nodes.has(start)) return undefined;

    const toVisit = [start];
    const seen = new Set([start]);
    const visitedValues = [];

    while (toVisit.length) {
      const current = getNext(toVisit);
      visitedValues.push(current.value);

      for (const adjacent of current.adjacent) {
        if (!seen.has(adjacent)) {
          seen.add(adjacent);
          toVisit.push(adjacent);
        }
      }
    }
    return visitedValues;
  }

  // Returns an array of Node values using DFS
  depthFirstSearch(start) {
    return this._traverse(start, (stack) => stack.pop());
  }

  // Returns an array of Node values using BFS
  breadthFirstSearch(start) {
    return this._traverse(start, (queue) => queue.shift());
  }
}

module.exports = { Graph, Node };
