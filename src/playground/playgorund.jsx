import React, { useEffect, useState } from "react";

const Output = ({ executeSignal, onExecuteComplete }) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        if (executeSignal) {
            document.getElementById("OP").innerText += `\n${value}`;
            if (onExecuteComplete) onExecuteComplete(); // Notify parent when done
        }
    }, [executeSignal, value, onExecuteComplete]);

    const onDragStart = (event) => {
        event.dataTransfer.setData("block", "Output");
    };

    return (
        <div
            draggable
            onDragStart={onDragStart}
            style={{
                backgroundColor: "goldenrod",
                margin: "10px",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            Output{" "}
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ marginLeft: "10px" }}
            />
        </div>
    );
};

const Loop = ({ executeSignal, onExecuteComplete }) => {
    const [repeatCount, setRepeatCount] = useState(0);
    const [workspace, setWorkspace] = useState([]);
    const [currentIteration, setCurrentIteration] = useState(0);
    const [childExecution, setChildExecution] = useState(false);

    useEffect(() => {
        if (executeSignal && currentIteration < repeatCount) {
            setChildExecution(true);
        } else if (executeSignal && currentIteration >= repeatCount) {
            if (onExecuteComplete) onExecuteComplete();
            setCurrentIteration(0);
        }
    }, [executeSignal, currentIteration, repeatCount, onExecuteComplete]);

    const handleChildComplete = () => {
        setChildExecution(false);
        setCurrentIteration((prev) => prev + 1);
    };

    const onDragStart = (event) => {
        event.dataTransfer.setData("block", "Loop");
    };

    const onDrop = (event) => {
        const blockType = event.dataTransfer.getData("block");
        event.stopPropagation();
        if (blockType === "Output") setWorkspace([...workspace, Output]);
        if (blockType === "If") setWorkspace([...workspace, If]);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            style={{
                backgroundColor: "goldenrod",
                margin: "10px",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            Repeat{" "}
            <input
                type="number"
                value={repeatCount}
                onChange={(e) => setRepeatCount(Number(e.target.value))}
                style={{ marginLeft: "10px" }}
            />{" "}
            times
            <div
                style={{
                    backgroundColor: "#FFFACD",
                    padding: "10px",
                    borderRadius: "5px",
                }}
            >
                {workspace.map((Block, index) => (
                    <Block
                        key={index}
                        executeSignal={childExecution}
                        onExecuteComplete={handleChildComplete}
                    />
                ))}
            </div>
            <br />
            End Repeat
        </div>
    );
};

const If = ({ executeSignal, onExecuteComplete }) => {
    const [leftValue, setLeftValue] = useState("");
    const [rightValue, setRightValue] = useState("");
    const [operator, setOperator] = useState("==");
    const [workspaceIf, setWorkspaceIf] = useState([]);
    const [workspaceElse, setWorkspaceElse] = useState([]);
    const [executingIf, setExecutingIf] = useState(false);

    useEffect(() => {
        if (executeSignal) {
            const condition = evaluateCondition(leftValue, rightValue, operator);
            setExecutingIf(condition);
        }
    }, [executeSignal, leftValue, rightValue, operator]);

    const evaluateCondition = (left, right, operator) => {
        switch (operator) {
            case "==":
                return left == right;
            case "!=":
                return left != right;
            case "<":
                return left < right;
            case ">":
                return left > right;
            case "<=":
                return left <= right;
            case ">=":
                return left >= right;
            default:
                return false;
        }
    };

    const handleChildComplete = () => {
        onExecuteComplete();
    };

    const onDragStart = (event) => {
        event.dataTransfer.setData("block", "If");
    };

    const onDrop = (event, target) => {
        const blockType = event.dataTransfer.getData("block");
        event.stopPropagation();

        if (blockType === "Output") {
            if (target === "if") setWorkspaceIf([...workspaceIf, Output]);
            if (target === "else") setWorkspaceElse([...workspaceElse, Output]);
        }else if (blockType=="Loop"){



            if (target === "if") setWorkspaceIf([...workspaceIf, Loop]);
            if (target === "else") setWorkspaceElse([...workspaceElse, Loop]);
        }
        else {


            if (target === "if") setWorkspaceIf([...workspaceIf, If]);
            if (target === "else") setWorkspaceElse([...workspaceElse, If]);
        }
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            draggable
            onDragStart={onDragStart}
            style={{
                backgroundColor: "goldenrod",
                margin: "10px",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            If{" "}
            <input
                type="text"
                value={leftValue}
                onChange={(e) => setLeftValue(e.target.value)}
                style={{ marginLeft: "10px" }}
            />
            <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                style={{ marginLeft: "10px" }}
            >
                <option value="==">==</option>
                <option value="!=">!=</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="<=">&lt;=</option>
                <option value=">=">&gt;=</option>
            </select>
            <input
                type="text"
                value={rightValue}
                onChange={(e) => setRightValue(e.target.value)}
                style={{ marginLeft: "10px" }}
            />
            <div
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, "if")}
                style={{
                    backgroundColor: "#FFFACD",
                    padding: "10px",
                    marginTop: "10px",
                    borderRadius: "5px",
                    color:"black"
                }}
            >
                If Workspace
                {workspaceIf.map((Block, index) => (
                    <Block
                        key={index}
                        executeSignal={executeSignal && executingIf}
                        onExecuteComplete={handleChildComplete}
                    />
                ))}
            </div>
            <div
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, "else")}
                style={{
                    backgroundColor: "#FFFACD",
                    padding: "10px",
                    marginTop: "10px",
                    borderRadius: "5px",
                    color:'black'
                }}
            >
                Else Workspace
                {workspaceElse.map((Block, index) => (
                    <Block
                        key={index}
                        executeSignal={executeSignal && !executingIf}
                        onExecuteComplete={handleChildComplete}
                    />
                ))}
            </div>
        </div>
    );
};

const Playground = () => {
    const [workspace, setWorkspace] = useState([]);
    const [currentExecutionIndex, setCurrentExecutionIndex] = useState(0);
    const [executionSignal, setExecutionSignal] = useState(false);

    const onDrop = (event) => {
        const blockType = event.dataTransfer.getData("block");
        if (blockType === "Output") setWorkspace([...workspace, Output]);
        if (blockType === "If") setWorkspace([...workspace, If]);
        if (blockType === "Loop") setWorkspace([...workspace, Loop]);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const handleExecutionComplete = () => {
        setCurrentExecutionIndex((prev) => prev + 1);
    };

    useEffect(() => {
        if (executionSignal && currentExecutionIndex < workspace.length) {
            setExecutionSignal(false);
            setTimeout(() => setExecutionSignal(true), 0);
        }
    }, [executionSignal, currentExecutionIndex, workspace.length]);

    const handleRun = () => {
        setCurrentExecutionIndex(0);
        setExecutionSignal(true);
    };

    const handleClear = () => {
        setExecutionSignal(false);
        setCurrentExecutionIndex(0);
        document.getElementById("OP").innerText = "";
    };

    return (
        <div className="playground" style={{ padding: "20px" }}>
            <div className="blocks" style={{ display: "flex", gap: "10px" }}>
                <Output />
                <If />
                <Loop />
            </div>
            <div
                onDragOver={onDragOver}
                onDrop={onDrop}
                style={{
                    width: "100vw",
                    height: "100px",
                    backgroundColor: "#000",
                    padding: "10px",
                    marginTop: "20px",
                    borderRadius: "5px",
                    color: "#FFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {workspace.map((Block, index) => (
                    <Block
                        key={index}
                        executeSignal={executionSignal && currentExecutionIndex === index}
                        onExecuteComplete={handleExecutionComplete}
                    />
                ))}
            </div>
            <button
                onClick={handleRun}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Run
            </button>
            <button
                onClick={handleClear}
                style={{
                    marginTop: "20px",
                    padding: "10px 20px",
                    backgroundColor: "#F44336",
                    color: "#FFF",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Clear
            </button>
            <div
                id="OP"
                style={{
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: "#FFF",
                    borderRadius: "5px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    color: "black",
                }}
            ></div>
        </div>
    );
};

export default Playground;
