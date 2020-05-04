import React, { Component } from 'react';

import { Breadcrumb, Row, Col, Image, Table, Button, Spinner } from 'react-bootstrap';
import { Box, Heading, Tab, Tabs } from 'grommet';
import MetadataTabFactCheckService from './MetadataTabFactCheckService';
import MetadataTabTattle from './MetadataTabTattle';
import MetadataTabMSR from './MetadataTabMSR';


import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import { Redirect } from 'react-router';

//actions
import { fetchPost, fetchPostMetadata } from '../../../redux/actions/post';

class PostMetadata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post_id: 0,
      post: {
                user: {username:'Loading'}, 
                createdAt: '0000-00-00T00:00:00.000Z',
                mediaUrl: '#'
            },
      metadata: [],
      count: 0,
      loading: true,
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    let urlChunks = path.split('/');
    let post_id = urlChunks[urlChunks.length-2];
    this.setState({post_id: post_id});
    console.log("Hereeee");
    this.props.fetchPost(post_id);
    this.props.fetchPostMetadata(post_id);
  }

  componentWillReceiveProps(nextProps) {
    //console.log("nextProps", nextProps);
    if (nextProps.post !== this.props.post) {
      this.setState({
        post: nextProps.post,
        metadata: nextProps.post.metadata,
      });
    }
  }

  refresh() {
    this.props.fetchPosts(this.state.page);
  }

  render() {
    let createdAt = this.state.post.createdAt.split('T')[0];
    return (
            <Box direction={'column'} margin={'small'}>
            {
              this.props.loading 
              ?
                <Spinner animation="border" />
              :
              <React.Fragment>
                <Breadcrumb>
                    <Breadcrumb.Item href="/posts"> Posts </Breadcrumb.Item>
                    <Breadcrumb.Item href={ "/posts/id/"+this.state.post_id }> { this.state.post_id } </Breadcrumb.Item>
                    <Breadcrumb.Item href={ "/posts/"+this.state.post_id+"/metadata" } active>Metadata</Breadcrumb.Item>
                </Breadcrumb>
                <Row className="mh-50">
                    <Col>
                        <Image src={ this.state.post.mediaUrl } style={{ maxHeight: '400px', maxWidth: '400px' }} />
                    </Col>
                    <Col>
                        <Table striped bordered hover size="sm">
                            <tr>
                              <th>Source</th>
                              <td>{ this.state.post.user.username }</td>
                            </tr>
                            <tr>
                              <th>Added on</th>
                              <td>{ createdAt }</td>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <td>Pending Review</td>
                            </tr>
                        </Table>
                        <Button href={ "/posts/"+this.state.post_id+"/metadata/changes" }>View changes</Button>
                    </Col>
                </Row>
                <Heading level={1}> Metadata </Heading>
                <Tabs justify="start">
                    <Tab title="Tattle" alignSelf="start">
                        <MetadataTabTattle />
                    </Tab>
                    <Tab title="Factcheck">
                        <MetadataTabFactCheckService />
                    </Tab>
                    <Tab title="MSR">
                        <MetadataTabMSR />
                    </Tab>
                </Tabs>
            </React.Fragment>
            }
            </Box>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  metadata: state.metadata,
  loading: state.loading
});

const PostMetadataPage = withRouter(
  connect(
    mapStateToProps,
    { fetchPost, fetchPostMetadata }
  )(PostMetadata)
);

export default PostMetadataPage;


var textData = {
    id: 1,
    type: 'text',
    label: 'Text',
    value: 'Lorem ipsum.',
    author: 100,
};
var numberData = {
    id: 2,
    type: 'number',
    label: 'Number',
    value: 15,
    author: 101,
};
var dateData = {
    id: 3,
    type: 'date',
    label: 'Date',
    value: '2020-03-22',
    author: 102,
};
var locationTextData = {
    id: 4,
    type: 'location_text',
    label: 'Location Text',
    value: 'Punjab',
    author: 103,
};
var locationCoordData = {
    id: 5,
    type: 'location_lat_lon',
    label: 'Location Coordinates',
    value: [59.69512, 20.51566],
    author: 102,
};
var dateRangeData = {
    id: 6,
    type: 'dateRange',
    label: 'Date Range',
    value: ['2020-03-10T00:00:00.000Z', '2020-03-27T00:00:00.000Z'],
    author: 106,
};
var enumData = {
    id: 7,
    type: 'text',
    label: 'Selection',
    value: 'Photo',
    author: 109,
};

var dataObj = {
    textData: textData,
    numberData: numberData,
    dateData: dateData,
    locationTextData: locationTextData,
    locationCoordData: locationCoordData,
    dateRangeData: dateRangeData,
    enumData: enumData,
};

/**
 * @author
 * @function PostMetadata
 **/
/*
const PostMetadata = () => {
    // const [currentData, setCurrentData] = useState(dataObj)
    return (
        <Box direction={'column'} margin={'small'}>
            <Breadcrumb>
                <Breadcrumb.Item href="/posts"> Posts </Breadcrumb.Item>
                <Breadcrumb.Item href="/post/1"> 1 </Breadcrumb.Item>
                <Breadcrumb.Item href="/posts/1/metadata" active>Metadata</Breadcrumb.Item>
            </Breadcrumb>
            <Row className="mh-50">
                <Col>
                    <Image src="https://digiteye.in/wp-content/uploads/2020/04/kim1-620x330.jpg" />
                </Col>
                <Col>
                    <Table striped bordered hover size="sm">
                        <tr>
                          <th>Source</th>
                          <td>Telegram Bot</td>
                        </tr>
                        <tr>
                          <th>Added on</th>
                          <td>29th March, 2020</td>
                        </tr>
                        <tr>
                          <th>Status</th>
                          <td>Pending Review</td>
                        </tr>
                    </Table>
                    <Button href="/posts/1/metadata/changes">View changes</Button>
                </Col>
            </Row>
            <Heading level={1}> Metadata </Heading>
            <Tabs justify="start">
                <Tab title="Tattle" alignSelf="start">
                    <MetadataTabTattle />
                </Tab>
                <Tab title="Factcheck">
                    <MetadataTabFactCheckService />
                </Tab>
                <Tab title="MSR">
                    <MetadataTabMSR />
                </Tab>
            </Tabs>
        </Box>
    );
};*/