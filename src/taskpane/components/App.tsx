import * as React from "react";
import { DefaultButton } from "@fluentui/react";

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
        <DefaultButton
          className="ms-Button"
          id="create-content-control"
          iconProps={{ iconName: "ChevronRight" }}
          onClick={createContentControl}
        >
          Create Content Control
        </DefaultButton>
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
