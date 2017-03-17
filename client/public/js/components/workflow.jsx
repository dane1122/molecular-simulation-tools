import React from 'react';
import SelectionRecord from '../records/selection_record';
import Status from '../components/status';
import View from '../components/view';
import WorkflowRecord from '../records/workflow_record';
import WorkflowSteps from '../components/workflow_steps';
import ioUtils from '../utils/io_utils';
import selectionConstants from '../constants/selection_constants';

require('../../css/workflow.scss');

function Workflow(props) {
  const ios = props.workflow.run.inputs.concat(props.workflow.run.outputs);
  const pdbIos = ios.filter(io => io.value.endsWith('.pdb'));

  let selectedModelData;
  if (props.selection.taskIndex === props.workflow.tasks.size) {
    // Morph is chosen from a list of all input/output pdbs
    const modelDatas = pdbIos.map(io => io.fetchedValue);
    selectedModelData = modelDatas.get(props.morph);
  } else if (props.selection.type === selectionConstants.TASK &&
    props.workflow.run.inputs.size) {
    selectedModelData = ioUtils.getPdb(props.workflow.run.inputs);
  }

  let viewError;
  const fetchingError = props.workflow.fetchingError;
  if (fetchingError && fetchingError.response &&
    fetchingError.response.status === 404) {
    const lookingFor = props.runPage ? 'run' : 'workflow';
    viewError = `This ${lookingFor} does not exist!`;
  }

  let selectionStrings = null;
  const selectedLigand = ioUtils.getSelectedLigand(props.workflow.run.inputs);
  if (selectedLigand) {
    selectionStrings = ioUtils.getLigandSelectionStrings(
      props.workflow.run.inputs, selectedLigand,
    );
  }

  const loadingOrError = !!(props.workflow.fetching ||
    props.workflow.fetchingError ||
    props.workflow.run.fetchingDataError);
  const hideStatus = props.workflow.fetching ||
    props.workflow.run.fetchingDataError;

  return (
    <div className="workflow">
      {
        loadingOrError ? null : (
          <WorkflowSteps
            clickAbout={props.clickAbout}
            clickTask={props.clickTask}
            selection={props.selection}
            workflow={props.workflow}
            hideSteps={loadingOrError}
          />
        )
      }
      <Status
        changeLigandSelection={props.changeLigandSelection}
        clickRun={props.clickRun}
        fetching={props.workflow.fetching}
        fetchingData={props.workflow.run.fetchingData}
        hideContent={hideStatus}
        morph={props.morph}
        numberOfPdbs={pdbIos.size}
        onClickColorize={props.onClickColorize}
        onChangeMorph={props.onChangeMorph}
        onSelectInputFile={props.onSelectInputFile}
        selectedLigand={selectedLigand}
        selection={props.selection}
        submitInputString={props.submitInputString}
        submitEmail={props.submitEmail}
        workflow={props.workflow}
      />
      <View
        colorized={props.colorized}
        error={viewError}
        loading={props.workflow.fetching || props.workflow.run.fetchingData}
        modelData={selectedModelData}
        selectionStrings={selectionStrings}
      />
    </div>
  );
}

Workflow.defaultProps = {
  workflow: null,
};

Workflow.propTypes = {
  changeLigandSelection: React.PropTypes.func.isRequired,
  clickAbout: React.PropTypes.func.isRequired,
  clickRun: React.PropTypes.func.isRequired,
  clickTask: React.PropTypes.func.isRequired,
  colorized: React.PropTypes.bool.isRequired,
  morph: React.PropTypes.number.isRequired,
  onClickColorize: React.PropTypes.func.isRequired,
  onChangeMorph: React.PropTypes.func.isRequired,
  onSelectInputFile: React.PropTypes.func.isRequired,
  runPage: React.PropTypes.bool.isRequired,
  selection: React.PropTypes.instanceOf(SelectionRecord).isRequired,
  submitInputString: React.PropTypes.func.isRequired,
  submitEmail: React.PropTypes.func.isRequired,
  workflow: React.PropTypes.instanceOf(WorkflowRecord),
};

export default Workflow;
