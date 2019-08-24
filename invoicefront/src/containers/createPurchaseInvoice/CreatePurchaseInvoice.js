import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
	root: {
		width: '80%',
		justifyContent: 'center',
		margin: 'auto'

	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,

	},

}));

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: '#5CDB95',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
			margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);


const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);


		

const CreatePurchaseInvoice= () => {
	const classes = useStyles();

		return (
			<div className={classes.root}>
				<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={classes.heading}>Search for Customer</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
							sit amet blandit leo lobortis eget.
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>

				<br/>

				<ExpansionPanel>
					<ExpansionPanelSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2a-content"
						id="panel2a-header"
					>
						<Typography className={classes.heading}>General Invoice Details</Typography>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
							sit amet blandit leo lobortis eget.
						</Typography>
					</ExpansionPanelDetails>
				</ExpansionPanel>
				
			</div>
		);
	}

export default CreatePurchaseInvoice