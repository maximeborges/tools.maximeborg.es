import { h, Component } from 'preact';
import s from './style.module.scss';

if (typeof TextEncoder === "undefined" && typeof window !== "undefined") {  
    var polyfill1 = document.createElement("script");
    polyfill1.src = "./assets/libs/encoding-indexes.js";
    polyfill1.async = false;
    var polyfill2 = document.createElement("script");
    polyfill2.src = "./assets/libs/encoding.js";
    polyfill2.async = false;
    document.head.appendChild(polyfill1);
    document.head.appendChild(polyfill2);
}

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
        this.handleInputDec = this.handleInputDec.bind(this);
        
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
                
                hexError: '',
                textError: '',
                decError: '',
                binError: '',
                base64Error: s.error,
            });
        }
    }
    
    handleInputText(event) {
        let val = event.target.value;
        if(val == '') return this.clear();
        
        let encoder = new TextEncoder('utf8');
        let utf8 = encoder.encode(val);
        // TODO: add option to use CR &/| LF for carriage return
        
        this.setState({
            textValue: val,
            base64Value: btoa(String.fromCharCode.apply(null, utf8)),
            decValue: utf8.reduce((prevVal, elem, index, array) => {
                return prevVal + this.pad(elem.toString(10), 3) + (index == array.length - 1?'':' ');
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
        if(val.search(/^(\s+)?([0-9A-Fa-f]{1,2}(\s+)?)+$/) == 0) {
            // Get each hex pair
            let splittedVal = val.match(/(\s+)?[0-9A-Fa-f]{1,2}(\s+)?/g);
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
                    return prevVal + this.pad(elem.toString(10), 3) + (index == array.length - 1?'':' ');
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
        if(val.search(/^(\s+)?([01]{1,8}(\s+)?)+$/) == 0) {
            // Get each hex pair
            let splittedVal = val.match(/(\s+)?[01]{1,8}(\s+)?/g);
            let decArr = [];
            for(let bin of splittedVal) {
                decArr.push(parseInt(bin, 2));
            }
            
            let decoder = new TextDecoder('utf8');
            let text = decoder.decode(new Uint8Array(decArr));
            
            this.setState({
                hexValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + this.pad(elem.toString(16).toUpperCase(), 2) + (index == array.length - 1?'':' ');
                }, ""),
                textValue: text,
                decValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + this.pad(elem.toString(10), 3) + (index == array.length - 1?'':' ');
                }, ""),
                binValue: val,
                base64Value: btoa(String.fromCharCode.apply(null, decArr)),
            });
        }
    }
    handleInputBase64(event) {
        let val = event.target.value;
        if(val == '') return this.clear();

        // Ugly
        let b64DecodeUnicode = (str) => {
            return Array.prototype.map.call(atob(str), function(c) {
                return parseInt(('00' + c.charCodeAt(0).toString(16)).slice(-2), 16);
            });
        };
        
        let decArr;
        try {
            decArr = b64DecodeUnicode(val);

            let decoder = new TextDecoder('utf8');
            let text = decoder.decode(new Uint8Array(decArr));

            if(this.base64Error != '') {
                this.setState({base64Error: ''});
            }
            
            this.setState({
                textValue: text,
                base64Value: val,
                decValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + this.pad(elem.toString(10), 3) + (index == array.length - 1?'':' ');
                }, ""),
                hexValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + this.pad(elem.toString(16).toUpperCase(), 2) + (index == array.length - 1 ? '' : ' ');
                }, ""),
                binValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + this.pad(elem.toString(2), 8) + (index == array.length - 1?'':' ');
                }, ""),
            });
        } catch(e) {
            this.setState({base64Error: s.error, base64Value: val});
        }
    }
    handleInputDec(event) {
        let val = event.target.value;
        if(val == '') return this.clear();
        
        // Check if there is a valid input
        // TODO: add error if invalid
        if(val.search(/^(\s+)?([0-9]{1,3}(\s+)?)+$/) == 0) {
            // Get each hex pair
            let splittedVal = val.match(/(\s+)?[0-9]{1,3}(\s+)?/g);
            let decArr = [];
            for(let dec of splittedVal) {
                decArr.push(parseInt(dec));
            }
            
            let decoder = new TextDecoder('utf8');
            let text = decoder.decode(new Uint8Array(decArr));
            
            this.setState({
                decValue: val,
                textValue: text,
                hexValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + this.pad(elem.toString(16), 2) + (index == array.length - 1?'':' ');
                }, ""),
                binValue: decArr.reduce((prevVal, elem, index, array) => {
                    return prevVal + this.pad(elem.toString(2), 8) + (index == array.length - 1?'':' ');
                }, ""),
                base64Value: btoa(String.fromCharCode.apply(null, decArr)),
            });
        }
    }
    
	render() {
        var classes = {
            bgColor: (this.props.bgColor ? 'bgColor-' + this.props.bgColor : ''),
        };
        // var classnames = cx(style, [
        //     'this',
        //     classes.bgColor,
        // ]);
		return (
			<div class={s.converter}>
            <div class={s.grid}>
            <div class={s.container} id={s.text}>
            <h2>Text (UTF-8)</h2>
            <textarea class={this.textError} onInput={this.handleInputText} value={this.state.textValue}></textarea>
            </div>
            <div class={s.container} id={s.hex}>
            <h2>Hexadecimal</h2>
            <textarea class={this.hexError} onInput={this.handleInputHex} value={this.state.hexValue}></textarea>
            </div>
            <div class={s.container} id={s.bin}>
            <h2>Binary</h2>
            <textarea class={this.binError} onInput={this.handleInputBin} value={this.state.binValue}></textarea>
            </div>
            <div class={s.container} id={s.base64}>
            <h2>Base64</h2>
            <textarea class={this.base64Error} onInput={this.handleInputBase64} value={this.state.base64Value}></textarea>
            </div>
            <div class={s.container} id={s.dec}>
            <h2>Decimal</h2>
            <textarea class={this.decError} onInput={this.handleInputDec} value={this.state.decValue}></textarea>
            </div>
            </div>
			</div>
		);
	}
}
