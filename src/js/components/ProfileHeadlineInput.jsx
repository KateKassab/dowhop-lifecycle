// @flow

import React, { Component } from 'react';
import { CardTitle, CardSubtitle, Form, Input } from 'reactstrap';

type Props = {
  headline: Object,
  headlineValue: string,
  handleHeadlineSubmit: Function,
  handleHeadlineChange: Function,
  uid: string
};

class ProfileHeadlineInput extends Component<Props, { isEdit: boolean, isValid: boolean }> {
  state = {
    isEdit: false,
    isValid: true
  };

  componentDidMount() {
    this.validateInput();
  }

  props: Props;

  handleEdit = () => {
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  handleChange = (e: Object) => {
    this.props.handleHeadlineChange(e);
    this.validateInput(e);
  };

  handleSubmit = (e: Object, headlineValue: string, uid: string) => {
    this.setState({
      isEdit: !this.state.isEdit
    });
    this.props.handleHeadlineSubmit(e, headlineValue, uid);
  };

  validateInput = (e: Object) => {
    if (e && e.target.value.length > 110) {
      this.setState({ isValid: false });
    } else {
      this.setState({ isValid: true });
    }
  };

  render() {
    const { headline, headlineValue, uid } = this.props;
    const { isValid, isEdit } = this.state;

    return !isEdit ? (
      <div className="profile-pencil">
        <CardSubtitle>
          Headline
          <span className="fa fa-pencil pencil-header" onClick={this.handleEdit} aria-hidden="true" />
        </CardSubtitle>
        <CardTitle className="center-text">{headline && headline.profileHeadline}</CardTitle>
      </div>
    ) : (
      <div>
        <Form onSubmit={e => this.handleSubmit(e, headlineValue, uid)}>
          <Input
            type="text"
            value={headlineValue}
            placeholder="Start typing to create your headline..."
            size="sm"
            onChange={this.handleChange}
            className="profile-header-input"
            valid={isValid}
          />
          <CardTitle className="center-text">{headline && headline.profileHeadline}</CardTitle>
          <Input type="submit" hidden />
        </Form>
      </div>
    );
  }
}

export default ProfileHeadlineInput;