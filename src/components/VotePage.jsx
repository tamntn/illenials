import React, { Component } from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { Search } from '@material-ui/icons';

class VotePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return <div>
            <TextField
                // className={clsx(classes.margin, classes.textField)}
                variant="outlined"
                label="Search for your favorite song"
                // value={values.weight}
                // onChange={handleChange('weight')}
                helperText="Ex: Crawl Outta Love"
                InputProps={{
                    endAdornment: <InputAdornment position="end"><Search /></InputAdornment>,
                }}
            />
        </div>
    }
}

export default VotePage;