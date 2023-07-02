/*
COPYRIGHT (c) 2006 YAHOO!INC.

The following BSD License applies solely to the programming code
included in this file. 

(1)	Redistributions of source code must retain the above copyright
notice, this list of conditions, and the following disclaimer.
(2)	Redistributions in binary form must reproduce the above
copyright notice, this list of conditions and the following disclaimer
in the documentation and/or other materials provided with the
distribution.
(3) 	Neither the name of Yahoo!nor the names of its contributors may
be used to endorse or promote products derived from the Yahoo!Widgets
without specific prior written permission of Yahoo!.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER
OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*global bf */

/*members appendChild, createDocument, createElement, dockOpen, getDate, 
    getMonth, setAttribute, setDockItem
*/

var monthNames   = [bf("January"), bf("February"), bf("March"), bf("April"), bf("May"), bf("June"),
				    bf("July"), bf("August"), bf("September"), bf("October"), bf("November"), bf("December")];

function buildCalendarVitality(d, colorize, textColor) {
	var doc, v, background, month, day;

	if (!widget.dockOpen) { 
		return;
	}
	
	if (!colorize) { 
		colorize  = "#307968"; 
	}
	if (!textColor) {
		textColor = "#FFFFFF"; 
	}

	// create an XML document
	doc = XMLDOM.createDocument();
	v = doc.createElement("dock-item");
	v.setAttribute("version", "1.0");
	doc.appendChild(v);
	background = doc.createElement("image");
	background.setAttribute("src", "Resources/security.png");
	background.setAttribute("hOffset", 0);
	v.appendChild(background);
	
	month = doc.createElement("text");
	month.setAttribute("hOffset", "38");
	month.setAttribute("vOffset", "28");
	month.setAttribute("hAlign", "center");
	month.setAttribute("style", "font-family: Arial;font-size: 11px; font-weight: bold; color: " + textColor);
	month.setAttribute("data", monthNames[d.getMonth()]);
	v.appendChild(month);
	
	day = doc.createElement("text");
	day.setAttribute("hOffset", "37");
	day.setAttribute("vOffset", "63");
	day.setAttribute("hAlign", "center");
	day.setAttribute("style", "font-family: Arial;font-size: 43px; font-weight: bold; color: " + textColor);
	day.setAttribute("data", d.getDate());
	v.appendChild(day);
	
	widget.setDockItem(doc, "fade");					
}
