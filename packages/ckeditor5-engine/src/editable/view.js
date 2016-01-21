/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import View from '../ui/view.js';
import CKEditorError from '../ckeditorerror.js';

export default class EditableView extends View {
	/**
	 * The element which is the main editable element (usually the one with `contentEditable="true"`).
	 *
	 * @property {HTMLElement} editableElement
	 */

	setEditableElement( editableElement ) {
		if ( this.editableElement ) {
			throw new CKEditorError(
				'editableview-cannot-override-editableelement: The editableElement cannot be overriden.'
			);
		}

		this.editableElement = editableElement;
		this.editableElement.contentEditable = this.model.isEditable;

		this.listenTo( editableElement, 'focus', () => {
			this.model.isFocused = true;
		} );

		this.listenTo( editableElement, 'blur', () => {
			this.model.isFocused = false;
		} );

		this.listenTo( this.model, 'change:isEditable', ( evt, value ) => {
			editableElement.contentEditable = value;
		} );
	}

	/**
	 * Temporary implementation (waiting for integration with the data model).
	 *
	 * @param {String} data HTML to be loaded.
	 */
	setData( data ) {
		this.editableElement.innerHTML = data;
	}

	/**
	 * Temporary implementation (waiting for integration with the data model).
	 *
	 * @returns {String} HTML string.
	 */
	getData() {
		return this.editableElement.innerHTML;
	}
}
