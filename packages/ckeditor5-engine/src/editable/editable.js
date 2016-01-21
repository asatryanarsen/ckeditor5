/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Controller from '../ui/controller.js';
import Model from '../ui/model.js';
import utils from '../utils.js';
import ObservableMixin from '../observablemixin.js';

/**
 * @extends core.ui.Controller
 * @mixins core.ObservableMixin
 */
export default class Editable extends Controller {
	/**
	 * Creates a new instance of the Editable class.
	 * @constructor
	 */
	constructor() {
		super();

		/**
		 * Whether the editable is in read-write or read-only mode.
		 *
		 * @property {Boolean} isEditable
		 */
		this.set( 'isEditable', true );

		/**
		 * Whether the editable is focused.
		 *
		 * @readonly
		 * @property {Boolean} isFocused
		 */
		this.set( 'isFocused', false );

		/**
		 * The parent editable of this editable
		 *
		 * @readonly
		 * @property {Editable} parent
		 */
		this.parent = null;
	}

	/**
	 * @protected
	 */
	get viewModel() {
		if ( this._viewModel ) {
			return this._viewModel;
		}

		const viewModel = new Model( {
			isFocused: this.isFocused
		} );
		this._viewModel = viewModel;

		viewModel.bind( 'isEditable' ).to( this );
		this.bind( 'isFocused' ).to( viewModel );

		return viewModel;
	}

	/**
	 * Temporary implementation (waiting for integration with the data model).
	 *
	 * @param {String} data HTML to be loaded.
	 */
	setData( data ) {
		this.view.setData( data );
	}

	/**
	 * Temporary implementation (waiting for integration with the data model).
	 *
	 * @returns {String} HTML string.
	 */
	getData() {
		return this.view.getData();
	}
}

utils.mix( Editable, ObservableMixin );
