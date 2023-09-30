import * as React from "react";
import { DefaultButton } from "@fluentui/react";
import { generateTemplate } from "../template";

/* global Word */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    this.setState({
      listItems: [
        {
          icon: "Ribbon",
          primaryText: "Achieve more with Office integration",
        },
        {
          icon: "Unlock",
          primaryText: "Unlock features and functionality",
        },
        {
          icon: "Design",
          primaryText: "Create and visualize like a pro",
        },
      ],
    });
  }

  render() {
    const { isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return <div>Please sideload your addin to see app body.</div>;
    }

    return (
      <div className="ms-welcome">
        <section className="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500">
          <h1 className="ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary">Hero Word !</h1>
        </section>

        <h2 className="ms-font-xl ms-fontWeight-semilight ms-fontColor-neutralPrimary ms-u-slideUpIn20">Hero Word !</h2>

        <main className="ms-welcome__main">
          <DefaultButton
            className="ms-Button"
            id="create-content-control"
            iconProps={{ iconName: "ChevronRight" }}
            onClick={createContentControl}
          >
            Create Content Control
          </DefaultButton>

          <DefaultButton
            className="ms-Button"
            id="create-content-control"
            iconProps={{ iconName: "ChevronRight" }}
            onClick={generateTemplate}
          >
            Generate template
          </DefaultButton>
        </main>
      </div>
    );
  }
}

async function createContentControl() {
  await Word.run(async (context) => {
    const serviceNameRange = context.document.getSelection();
    const serviceNameContentControl = serviceNameRange.insertContentControl();

    serviceNameContentControl.title = "Service Name";
    serviceNameContentControl.tag = "serviceName";
    serviceNameContentControl.appearance = "BoundingBox";
    serviceNameContentControl.color = "blue";

    serviceNameContentControl.insertText("Fabrikam Online Productivity Suite", Word.InsertLocation.replace);

    await context.sync();
  });
}
