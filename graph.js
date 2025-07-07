const Queue = require("./queue");

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

  /**
   * Adds a node to the graph.
   * @param {Node} vertex The node to add.
   */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /**
   * Adds multiple nodes to the graph.
   * @param {Node[]} vertexArray An array of nodes to add.
   */
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /**
   * Creates an edge between two nodes in the graph.
   * @param {Node} v1 The first node.
   * @param {Node} v2 The second node.
   */
  addEdge(v1, v2) {
    if (!this.nodes.has(v1) || !this.nodes.has(v2))
      throw new Error("Both vertices must be in the graph to form an edge.");
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /**
   * Removes an edge between two nodes.
   * @param {Node} v1 The first node.
   * @param {Node} v2 The second node.
   */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /**
   * Removes a node and all its connections from the graph.
   * @param {Node} vertex The node to remove.
   */
  removeVertex(vertex) {
    if (!this.nodes.has(vertex)) return;

    for (const adjacent of vertex.adjacent) {
      this.removeEdge(vertex, adjacent);
    }
    this.nodes.delete(vertex);
  }

  /**
   * Private traversal helper.
   * @param {Node} start The starting node for the traversal.
   * @param {boolean} [useQueue=false] If true, uses BFS (queue); otherwise, uses DFS (stack).
   * @returns {*[]|undefined} An array of visited node values, or undefined if start node is not in graph.
   */
  _traverse(start, useQueue = false) {
    if (!this.nodes.has(start)) return undefined;

    const toVisit = useQueue ? new Queue() : [start];
    if (useQueue) {
      toVisit.enqueue(start);
    }
    const seen = new Set([start]);
    const visitedValues = [];

    while (useQueue ? !toVisit.isEmpty() : toVisit.length) {
      const current = useQueue ? toVisit.dequeue() : toVisit.pop();
      visitedValues.push(current.value);

      for (const adjacent of current.adjacent) {
        if (!seen.has(adjacent)) {
          seen.add(adjacent);
          if (useQueue) {
            toVisit.enqueue(adjacent);
          } else {
            toVisit.push(adjacent);
          }
        }
      }
    }
    return visitedValues;
  }

  /**
   * Performs a depth-first search starting from a given node.
   * @param {Node} start The starting node.
   * @returns {*[]} An array of node values in DFS order.
   */
  depthFirstSearch(start) {
    return this._traverse(start, false);
  }

  /**
   * Performs a breadth-first search starting from a given node.
   * @param {Node} start The starting node.
   * @returns {*[]} An array of node values in BFS order.
   */
  breadthFirstSearch(start) {
    return this._traverse(start, true);
  }

  /**
   * Finds the shortest path between two nodes in an unweighted graph.
   * @param {Node} source The starting node.
   * @param {Node} target The target node.
   * @returns {string[]|null} An array of node values representing the shortest path, or null if no path exists.
   */
  shortestPath(source, target) {
    if (!this.nodes.has(source) || !this.nodes.has(target)) return null;
    if (source === target) return [source.value];

    const queue = new Queue();
    queue.enqueue([source]);
    const visited = new Set([source]);

    while (!queue.isEmpty()) {
      const currentPath = queue.dequeue();
      let currentNode = currentPath[currentPath.length - 1];

      if (currentNode === target) {
        return currentPath.map((node) => node.value);
      }

      for (const adjacent of currentNode.adjacent) {
        if (!visited.has(adjacent)) {
          visited.add(adjacent);
          const newPath = [...currentPath, adjacent];
          queue.enqueue(newPath);
        }
      }
    }
    return null;
  }
}

module.exports = { Graph, Node };
