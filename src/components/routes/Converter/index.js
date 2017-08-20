import { h, Component } from 'preact';
import s from './style.scss';

export default class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: '',
            hexValue: '',
            binaryValue: '',
            base64Value: '',
            decValue: '',
        };

        this.handleInputText = this.handleInputText.bind(this);
        this.handleInputHex = this.handleInputHex.bind(this);
        this.handleInputBin = this.handleInputBin.bind(this);
        this.handleInputBase64 = this.handleInputBase64.bind(this);

        this.pad = (n, width) => {
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(0) + n;
        }

        this.clear = () => {
            this.setState({
                hexValue: '',
                textValue: '',
                decValue: '',
                binValue: '',
                base64Value: '',
            });
        }
    }

    handleInputText(event) {
        let val = event.target.value;
        if(val == '') return this.clear;

        let encoder = new TextEncoder('utf8');
        let utf8 = encoder.encode(val);
        // TODO: add option to use CR &/| LF for carriage return

        this.setState({
            textValue: val,
            base64Value: btoa(String.fromCharCode.apply(null, utf8)),
            decValue: utf8.reduce((prevVal, elem, index, array) => {
                return prevVal + elem.toString(10) + (index == array.length - 1?'':' ');
            }, ""),
            hexValue: utf8.reduce((prevVal, elem, index, array) => {
                return prevVal + this.pad(elem.toString(16), 2) + (index == array.length - 1?'':' ');
            }, ""),
            binValue: utf8.reduce((prevVal, elem, index, array) => {
                return prevVal + this.pad(elem.toString(2), 8) + (index == array.length - 1?'':' ');
            }, ""),
        });
    }
    handleInputHex(event) {
        let val = event.target.value;
        if(val == '') return this.clear();

        // Check if there is a valid input
        // TODO: add error if invalid
        if(val.search(/^([0-9A-Fa-f]{2} ?)+$/) == 0) {
            // Get each hex pair
            let splittedVal = val.match(/[0-9A-Fa-f]{2} ?/g);
            let decArr = [];
            for(let hex of splittedVal) {
                decArr.push(parseInt(hex, 16));
            }

            let decoder = new TextDecoder('utf8');
            let text = decoder.decode(new Uint8Array(decArr));

            this.setState({
                hexValue: val,
                textValue: text,
                decValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + elem.toString(10) + (index == array.length - 1?'':' ');
                }, ""),
                binValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + this.pad(elem.toString(2), 8) + (index == array.length - 1?'':' ');
                }, ""),
                base64Value: btoa(String.fromCharCode.apply(null, decArr)),
            });
        }
    }
    handleInputBin(event) {
        let val = event.target.value;
        if(val == '') return this.clear();

        // Check if there is a valid input
        // TODO: add error if invalid
        if(val.search(/^([01]{8} ?)+$/) == 0) {
            // Get each hex pair
            let splittedVal = val.match(/[01]{8} ?/g);
            let decArr = [];
            for(let bin of splittedVal) {
                decArr.push(parseInt(bin, 2));
            }

            let decoder = new TextDecoder('utf8');
            let text = decoder.decode(new Uint8Array(decArr));

            console.log(decArr)

            this.setState({
                hexValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + this.pad(elem.toString(16).toUpperCase(), 2) + (index == array.length - 1?'':' ');
                }, ""),
                textValue: text,
                decValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + elem.toString(10) + (index == array.length - 1?'':' ');
                }, ""),
                binValue: val,
                base64Value: btoa(String.fromCharCode.apply(null, decArr)),
            });
        }
    }
    handleInputBase64(event) {
        console.log(event);
    }
    handleInputDec(event) {
        console.log(event);
    }

	render() {
		return (
			<div class={s.converter}>
                <div class={s.grid}>
                    <div class={s.container} id={s.text}>
                        <h2>Text (UTF-8)</h2>
                        <textarea onInput={this.handleInputText} value={this.state.textValue}></textarea>
                    </div>
                    <div class={s.container} id={s.hex}>
                        <h2>Hexadecimal</h2>
                        <textarea onInput={this.handleInputHex} value={this.state.hexValue}></textarea>
                    </div>
                    <div class={s.container} id={s.bin}>
                        <h2>Binary</h2>
                        <textarea onInput={this.handleInputBin} value={this.state.binValue}></textarea>
                    </div>
                    <div class={s.container} id={s.base64}>
                        <h2>Base64</h2>
                        <textarea onInput={this.handleInputBase64} value={this.state.base64Value}></textarea>
                    </div>
                    <div class={s.container} id={s.dec}>
                        <h2>Decimal</h2>
                        <textarea onInput={this.handleInputDec} value={this.state.decValue}></textarea>
                    </div>
                </div>
			</div>
		);
	}
}