import React, { Component } from "react";
import Tagger from "../components/Tagger";
import logo from "../logo.svg";
import { AutoSizer } from "react-virtualized";
import "./Annotation.css";
let dragging = false;
export default class Annotation extends Component {
  onDragging = (isDragging) => (dragging = isDragging);

  updateTag = (tag) => {
    console.log(tag);
    // const { images, currentImageIndex } = this.state;
    // const imageTags = [...images[currentImageIndex].tags];
    // const tagIdx = imageTags.findIndex((t) => t.id === tag.id);
    // imageTags[tagIdx] = tag;
    // const newImages = [...images];
    // newImages[currentImageIndex].tags = imageTags;
    // lastTagPos[tag.label] = tag;
    // lastTagLabel = tag.label;
    // // this.tagsChanged()
    // this.setState({ images: newImages });
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        Annotaion
        <div id="tagger">
          <AutoSizer>
            {({ width, height }) => (
              <div style={{ width, height }} className="autosized-tagger">
                {console.log(width, height)}
                {/* {currentImage && ( */}
                <Tagger
                  image={{
                    height: 560,
                    width: 860,
                    name: "ross.jpeg",
                    tags: [
                      {
                        height: 0.5411090573012939,
                        id: 2,
                        label: "face",
                        width: 0.21783882783882783,
                        x: 0.04212454212454213,
                        y: 0.003031423290203328,
                      },
                    ],
                    thumbnailURL: logo,
                    url: logo,
                  }}
                  onDragging={this.onDragging}
                  onTagMove={this.updateTag}
                  width={width - 60}
                  height={height}
                />
                {/* )} */}
              </div>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}
